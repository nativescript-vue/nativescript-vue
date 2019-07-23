export default {
  render(h) {
    return h(
      'NativeTabStrip',
      {
        on: this.$listeners,
        attrs: this.$attrs
      },
      this.$slots.default
    )
  },

  mounted() {
    let _nativeView = this.$el.nativeView
    this.$parent.registerTabStrip(_nativeView)
  },

  methods: {
    registerTabStripItem(tabStripItem) {
      const items = this.$el.nativeView.items || []

      this.$el.setAttribute('items', items.concat([tabStripItem]))
    }
  }
}
