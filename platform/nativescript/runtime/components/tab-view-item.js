import { warn } from 'core/util/debug'

export default {
  template: `<NativeTabViewItem><slot /></NativeTabViewItem>`,

  mounted() {
    if (this.$el.childNodes.length > 1) {
      warn('TabViewItem should contain only 1 root element', this)
    }

    let _nativeView = this.$el.nativeView
    _nativeView.view = this.$el.childNodes[0].nativeView
    this.$parent.registerTab(_nativeView)
  }
}
