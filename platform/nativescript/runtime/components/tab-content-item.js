import { warn } from 'core/util/debug'

export default {
  template: `<NativeTabContentItem><slot /></NativeTabContentItem>`,

  mounted() {
    if (this.$el.childNodes.length > 1) {
      warn('TabContentItem should contain only 1 root element', this)
    }

    let _nativeView = this.$el.nativeView
    _nativeView.view = this.$el.childNodes[0].nativeView
    this.$parent.registerTabContentItem(_nativeView)
  }
}
