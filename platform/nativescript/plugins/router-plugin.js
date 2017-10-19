import { android, AndroidApplication } from 'application'

export default {
  install(Vue) {
    const patchGo = router => {
      if (router.go.__patched__) {
        return
      }

      if (router.history.index === -1) {
        // Todo: make sure this is indeed required
        // The problem: When using router.replace() to set the initial route
        // the history index stays -1, which then causes an issue when visiting a route,
        // going back, and then trying to visit again (the active route is not changed on nav back)
        // This fixes it, since it allows the router.go logic to run
        router.history.index = 0
      }

      const go = router.go

      router.go = n => {
        if (router.isPageRouter && n < 0) {
          for (let i = n; i < 0; ++i) {
            // Todo: figure out a cleaner way to navigate back n frames
            Vue.navigateBack()
          }
        }

        go.call(router, n)
      }

      router.go.__patched__ = true
    }

    const registerGuards = router => {
      if (router.__patched__) {
        return
      }

      router.afterEach(() => {
        if (!router.isPageRouter) {
          return
        }

        const component = router.getMatchedComponents()[0]

        Vue.navigateTo(component, {
          context: { router }
        })
      })

      router.__patched__ = true
    }

    Vue.mixin({
      beforeCreate() {
        if (!this.$options.router) {
          // If there is no router, we don't care
          return
        }

        const router = this.$options.router
        const self = this

        // Handle back button on android
        if (android && !android.__patched__) {
          android.on(AndroidApplication.activityBackPressedEvent, e => {
            if (router.history.index !== 0) {
              e.cancel = true
            }
            router.back()
          })

          android.__patched__ = true
        }

        if (!router.hasOwnProperty('isPageRouter')) {
          Object.defineProperty(router, 'isPageRouter', {
            get() {
              return self.$options.pageRouting
            }
          })
        }

        patchGo(router)
        registerGuards(router)

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
