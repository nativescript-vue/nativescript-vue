export default {
  template: `<NativeFrame :ref="reference" v-bind="$attrs" v-on="$listeners">>
        <slot></slot>
    </NativeFrame>`,
  data() {
    return {
      reference: Math.random()
        .toString(36)
        .substring(2, 15),
      context: ''
    }
  },
  mounted() {
    let THIS = this
    this.context = this.$refs[this.reference]

    this.$on('page_has_been_loaded', function(context) {
      THIS.context.nativeView.navigate(
        Object.assign(
          {},
          {
            create() {
              return context.nativeView // should be the page
            }
          }
        )
      )
    })
  }
}
