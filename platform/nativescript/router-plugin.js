export default {
  install(Vue) {
    const patchGo = router => {
      if (!router.go.__patched__) {
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
          if (n < 0) {
            for (let i = n; i < 0; ++i) {
              // Todo: figure out a cleaner way to navigate back n frames
              Vue.navigateBack()
            }
          }

          go.call(router, n)
        }

        router.go.__patched__ = true
      }
    }

    Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          this.__is_router__ = true
          const router = this.$options.router

          patchGo(router)

          this.$start = () => {
            this.__is_root__ = true
            this.__started__ = true

            const initial = router.history.current.matched[0].components.default
            this.$navigateTo(initial, {
              context: { router },
              clearHistory: true
            })

            // Mount the root component (Should be <router-page>) to register router hooks
            this.$nextTick(() => {
              const placeholder = this.$document.createComment('placeholder')

              this.$mount(placeholder)
            })
          }
        }
      }
    })
  }
}
