export default {
  template: `
    <native-label ref="label" v-bind="$attrs" v-on="$listeners">
      <slot></slot>
    </native-label>
  `
}
