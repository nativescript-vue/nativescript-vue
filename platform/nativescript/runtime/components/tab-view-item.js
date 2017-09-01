import { warn } from 'core/util/debug'

export default {
  name: 'tab-view-item',

  template: `<native-tab-view-item ref="tabViewItem"><slot></slot></native-tab-view-item>`,

  mounted() {
    if (this.$el.childNodes.length > 1) {
      warn('TabViewItem should contain only 1 root element', this)
    }

    let _nativeView = this.$refs.tabViewItem.nativeView
    _nativeView.view = this.$el.childNodes[0].nativeView
    this.$parent.registerTab(_nativeView)
  }
}
