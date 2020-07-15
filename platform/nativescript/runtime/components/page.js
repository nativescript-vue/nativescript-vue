import { updateDevtools } from '../../util'

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

    let frame = this._findParentFrame()

    // we only need call this for the "defaultPage" of the frame
    // which is equivalent to testing if any page is "current" in the frame
    if (frame && !frame.$el.nativeView.currentPage) {
      frame.notifyFirstPageMounted(this)
    }

    const handler = e => {
      if (e.isBackNavigation) {
        this.$el.nativeView.off('navigatedFrom', handler)
        this.$parent.$destroy()
      }
    }

    this.$el.nativeView.on('navigatedFrom', handler)

    // ensure that the parent vue instance is destroyed when the
    // page is disposed (clearHistory: true for example)
    const dispose = this.$el.nativeView.disposeNativeView
    this.$el.nativeView.disposeNativeView = (...args) => {
      this.$parent.$destroy()
      dispose.call(this.$el.nativeView, args)
      updateDevtools()
    }
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
}
