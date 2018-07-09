export default {
  model: {
    prop: 'selectedIndex',
    event: 'selectedIndexChange'
  },

  render(h) {
    return h(
      'NativeTabView',
      {
        on: this.$listeners,
        attrs: this.$attrs
      },
      this.$slots.default
    )
  },

  methods: {
    registerTab(tabView) {
      const items = this.$el.nativeView.items || []

      this.$el.setAttribute('items', items.concat([tabView]))
    }
  }
}
