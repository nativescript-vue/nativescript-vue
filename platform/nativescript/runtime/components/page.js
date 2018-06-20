export default {
  name: 'page',
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
    const frame = this._findParentFrame()
    if (frame) {
      frame.notifyPageMounted(this)
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
      while (parentFrame && parentFrame.$options.name !== 'frame') {
        parentFrame = parentFrame.$parent
      }

      return parentFrame
    }
  }
}
