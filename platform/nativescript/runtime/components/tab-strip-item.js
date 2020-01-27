export default {
  render(h) {
    return h(
      'NativeTabStripItem',
      {
        on: this.$listeners,
        attrs: this.$attrs
      },
      this.$slots.default
    )
  },

  mounted() {
    let _nativeView = this.$el.nativeView
    this.$parent.registerTabStripItem(_nativeView)
  }
}
