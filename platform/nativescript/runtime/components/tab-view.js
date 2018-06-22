export default {
  name: 'tab-view',

  model: {
    prop: 'tab',
    event: 'tabChange'
  },

  props: {
    tab: {
      type: Number,
      default: 0
    }
  },

  render(h) {
    return h(
      'NativeTabView',
      {
        ref: 'tabView',
        on: {
          selectedIndexChange: ({ value }) => this.$emit('tabChange', value)
        },
        attrs: {
          selectedIndex: this.$props.tab
        }
      },
      this.$slots.default
    )
  },

  methods: {
    registerTab(tabView) {
      const items = this.$refs.tabView.nativeView.items || []

      this.$refs.tabView.setAttribute('items', items.concat([tabView]))
    }
  }
}
