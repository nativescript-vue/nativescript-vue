export default {
  name: 'page',
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
    this._findParentFrame().notifyPageMounted(this)
  },
  methods: {
    _findParentFrame() {
      let parentFrame = this.$parent
      while (parentFrame.$options.name !== 'frame') {
        parentFrame = parentFrame.$parent
      }

      return parentFrame
    }
  }
}
