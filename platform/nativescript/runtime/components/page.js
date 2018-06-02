export default {
  name: 'page',
  template: `
    <NativePage v-bind="$attrs" v-on="$listeners">
      <slot />
    </NativePage>
  `,
  mounted() {
    this.$nextTick(() => this.navigateToPage())
  },
  methods: {
    navigateToPage() {
      console.log('navigateToPage')
      // find the closest parent frame
      let parentFrame = this.$parent
      while (parentFrame.$options.name !== 'frame') {
        parentFrame = parentFrame.$parent
      }

      // navigate the found frame to the page
      parentFrame.navigateToPage(this.$el.nativeView)
    }
  }
}
