import {
  findParentNavigationEntry,
  getFrameInstance
} from '../../plugins/navigator-plugin'
import { isHMRChecking } from '../../util/hmr'

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

    let frame = null

    if (isHMRChecking() && !require('tns-core-modules/platform').isAndroid) {
      const navEntry = findParentNavigationEntry(this)
      const options = {
        frame: navEntry ? navEntry.$options.frame : 'default'
      }
      frame = getFrameInstance(options.frame)
    } else {
      frame = this._findParentFrame()
    }

    if (frame) {
      frame.notifyPageMounted(this)
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
