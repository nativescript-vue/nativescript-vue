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
  mounted() {
    this.$el.nativeView[PAGE_REF] = this

    const frame = this._findParentFrame()

    if (frame) {
      frame.notifyPageMounted(this)
      frame.pageRoutes.push(this.$route.fullPath)
    }

    this.$nextTick(() => {
      const handler = e => {
        if (e.isBackNavigation) {
          this.$el.nativeView.off('navigatedFrom', handler)
          this.$destroy()
        }
      }
      this.$el.nativeView.on('navigatedFrom', handler)
    })
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

  beforeDestroy () {
    const frame = this._findParentFrame()

    if (frame && this.$router) {
      frame.notifyPageLeaving(this.$router.history.isGoingBack)
    }
  }
}
