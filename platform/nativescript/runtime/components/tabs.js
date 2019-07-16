export default {
  model: {
    prop: 'selectedIndex',
    event: 'selectedIndexChange'
  },

  render(h) {
    return h(
      'NativeTabs',
      {
        on: this.$listeners,
        attrs: this.$attrs
      },
      this.$slots.default
    )
  },

  methods: {
    registerTabStrip(tabStrip) {
      this.$el.setAttribute('tabStrip', tabStrip)
    },
    registerTabContentItem(tabContentItem) {
      const items = this.$el.nativeView.items || []

      this.$el.setAttribute('items', items.concat([tabContentItem]))
    }
  }
}
