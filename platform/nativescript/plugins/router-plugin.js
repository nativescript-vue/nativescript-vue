import { Page } from 'ui/page'
import { before } from '../util/index'
import { start } from 'application'

export function patchRouter(router, Vue) {
  if (router.__patched_for_page_routing__) {
    return
  }
  router.__patched_for_page_routing__ = true

  // The problem: When using router.replace() to set the initial route
  // the history index stays -1, which then causes an issue when visiting a route,
  // going back, and then trying to visit again (the active route is not changed on nav back)
  // This fixes it, since it allows the router.go logic to run
  router.history.index = 0

  // initial navigation states
  router.isBackNavigation = false
  router.shouldNavigate = true
  router.pageStack = []
  router.pageTransition = null

  router.setPageTransition = (transition, duration, curve) => {
    if (typeof transition === 'string') {
      return (router.pageTransition = {
        name: transition,
        duration,
        curve
      })
    }

    router.pageTransition = transition
  }

  router._beginBackNavigation = (shouldNavigate = true) => {
    if (router.isBackNavigation) {
      throw new Error(
        'router._beginBackNavigation was called while already navigating back.'
      )
    }

    router.isBackNavigation = true
    router.shouldNavigate = shouldNavigate
  }

  router._finishBackNavigation = () => {
    if (!router.isBackNavigation) {
      throw new Error(
        'router._finishBackNavigation was called while there was no back navigation.'
      )
    }

    router.isBackNavigation = false
  }

  router.go = before(router.go, router, n => {
    if (n === -1 && !router.isBackNavigation) {
      router._beginBackNavigation()
    }
  })

  router.afterEach(() => {
    if (router.isBackNavigation) {
      if (router.shouldNavigate) {
        Vue.navigateBack()
      }

      router.pageStack.pop()
      const page = router.pageStack[router.pageStack.length - 1]

      if (!page) {
        router.isBackNavigation = false
        return
      }

      const callback = ({ isBackNavigation }) => {
        if (isBackNavigation) {
          router._finishBackNavigation()
        }
        page.off(Page.navigatedToEvent, callback)
      }

      page.on(Page.navigatedToEvent, callback)

      return
    }

    const component = router.getMatchedComponents()[0]

    Vue.navigateTo(component, {
      context: { router },
      transition: router.pageTransition,
      onComponent(component) {
        //only use page navigation if matched component is a page
        return component.$el.tagName === 'page'
      }
      // Todo: add transitionAndroid and transitionIOS
    }).then(page => {
      router.pageStack.push(page)

      page.on(Page.navigatedFromEvent, ({ isBackNavigation }) => {
        if (isBackNavigation && !router.isBackNavigation) {
          router._beginBackNavigation(false)
          router.back()
        }
      })
    })
  })
}

export default {
  install(Vue) {
    Vue.mixin({
      beforeCreate() {
        if (!this.$options.router) {
          // If there is no router, we don't care
          return
        }

        const router = this.$options.router
        const self = this

        patchRouter(router, Vue)

        // Overwrite the default $start function
        this.$start = () => {
          this.__is_root__ = true
          this.__started__ = true // skips the default start procedure

          // Mount the root component
          const placeholder = Vue.$document.createComment('placeholder')
          self.$mount(placeholder)

          //Create root component
          var vm = self

          if (self.$options.pageRouting) {
            //a router-page has been used as root element
            const initial = router.getMatchedComponents()[0]
            const contentComponent = Vue.extend(initial)
            vm = new contentComponent({ router })
            vm.$mount(placeholder)
          }

          //Create page element
          var page = vm.$el.nativeView

          if (vm.$el.tagName !== 'page') {
            page = new Page()
            page.content = vm.$el.nativeView
          }

          router.pageStack.push(page)

          //Start the app
          start({
            create() {
              return page
            }
          })
        }
      }
    })
  }
}
