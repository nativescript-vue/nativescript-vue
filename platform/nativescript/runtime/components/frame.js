import Vue from '../../framework'
//const Frame = require('tns-core-modules/ui/frame').Frame

export default {
  name: 'frame',
  created() {
    this.cache = {}
  },
  render(h) {
    return h(
      'NativeFrame',
      {
        attrs: this.$attrs,
        on: this.$listeners
      },
      this.$slots.default
    )
  },
  methods: {
    _getFrame() {
      return this.$el.nativeView // as Frame
    },

    notifyPageMounted(pageVm) {
      this.$nextTick(() => {
        console.log('notifyPageMounted')
        this.navigate({
          create: _ => pageVm.$el.nativeView
        })
      })
    },

    goBack() {
      this._getFrame()
    },
    navigate(entry) {
      const frame = this._getFrame()

      console.log(frame.backStack)
      frame.navigate(entry)
      console.log(frame.backStack)
    }
  }
}
