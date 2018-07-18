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
  created() {
    this.$vnode.parent.data.keepAlive = true
  },
  mounted() {
    this.$el.nativeView[PAGE_REF] = this

    const frame = this._findParentFrame()

    if (frame) {
      frame.notifyPageMounted(this)
    }

    const handler = e => {
      if (e.isBackNavigation) {
        this.$el.nativeView.off('navigatedFrom', handler)

        this.$vnode.parent.data.keepAlive = false
        this.$parent.$destroy()
      }
    }
    this.$el.nativeView.on('navigatedFrom', handler)
  },
  methods: {
    _findParentFrame() {
      let parentFrame = this.$parent
      while (parentFrame && parentFrame.$options.name !== 'Frame') {
        parentFrame = parentFrame.$parent
      }

      return parentFrame
    }
  },
  deactivated() {
    const frame = this._findParentFrame()

    if (frame && this.$router) {
      frame.notifyPageLeaving(this.$router.history)

      if (this._watcher) {
        this._watcher.teardown();
      }

      let i = this._watchers.length;

      while (i--) {
        this._watchers[i].teardown();
      }
    }
  }
}
