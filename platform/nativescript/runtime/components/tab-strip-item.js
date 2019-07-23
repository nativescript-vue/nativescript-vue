export default {
  template: `<NativeTabStripItem><slot /></NativeTabStripItem>`,

  mounted() {
    let _nativeView = this.$el.nativeView
    this.$parent.registerTabStripItem(_nativeView)
  }
}
