import { Page } from 'ui/page'
import { before, trace } from '../util/index'

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

  router.go = before(router.go, router, n => {
    if (n === -1) {
      router.isBackNavigation = true
      Vue.navigateBack()
    }
  })

  router.afterEach(() => {
    if (router.isBackNavigation) {
      router.isBackNavigation = false
      return
    }

    const component = router.getMatchedComponents()[0]

    Vue.navigateTo(component, {
      context: { router }
    }).then(page => {
      page.off(Page.navigatingFromEvent)
      page.on(Page.navigatingFromEvent, args => {
        if (args.isBackNavigation) {
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

          const initial = router.getMatchedComponents()[0]

          this.$navigateTo(initial, {
            context: { router },
            clearHistory: true
          })
        }
      }
    })
  }
}
