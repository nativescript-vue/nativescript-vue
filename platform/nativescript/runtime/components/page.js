export default {
  template: `<NativePage :ref="reference" v-bind="$attrs" v-on="$listeners">
        <slot></slot>
    </NativePage>`,
  data() {
    return {
      reference: Math.random()
        .toString(36)
        .substring(2, 15),
      context: null
    }
  },
  mounted() {
    let THIS = this
    this.context = this.$refs[this.reference]

    this.$nextTick(function() {
      THIS.$parent.$parent.$emit('page_has_been_loaded', this.context)
    })
  }
}
