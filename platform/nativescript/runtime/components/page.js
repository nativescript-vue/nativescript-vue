export const PAGE_REF = '__vuePageRef__'

export default {
  render(h) {
    return h(
      'NativePage',
      {
        attrs: this.$attrs,
        on: this.$listeners
      },
      this.$slots.default
    )
  },
  // created() {
  //   if (this.$router) {
  //     // Sometimes the parent is undefined
  //     // See https://github.com/nativescript-vue/nativescript-vue/issues/292
  //     if (this.$vnode.parent) {
  //       this.$vnode.parent.data.keepAlive = true
  //     }
  //   }
  // },
  mounted() {
    this.$el.nativeView[PAGE_REF] = this

    const frame = this._findParentFrame()

    if (frame) {
      frame.notifyPageMounted(this)
    }

    const handler = e => {
      if (e.isBackNavigation) {
        this.$el.nativeView.off('navigatedFrom', handler)

        // if (this.$router) {
        //   this.$parent.$vnode.data.keepAlive = false
        // }

        this.$parent.$destroy()
      }
    }

    this.$el.nativeView.on('navigatedFrom', handler)
  },
  methods: {
    _findParentFrame() {
      let frame = this.$parent

      while (frame && frame.$options.name !== 'Frame') {
        frame = frame.$parent
      }

      return frame
    }
  }
  // deactivated() {
  //   if (this.$router) {
  //     if (this._watcher) {
  //       this._watcher.teardown()
  //     }
  //
  //     let i = this._watchers.length
  //
  //     while (i--) {
  //       this._watchers[i].teardown()
  //     }
  //   }
  // }
}
