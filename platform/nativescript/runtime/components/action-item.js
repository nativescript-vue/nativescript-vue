export default {
  template: `
    <native-action-item ref="actionItem" v-bind="$attrs" v-on="$listeners">
      <slot></slot>
    </native-action-item>
  `
}
