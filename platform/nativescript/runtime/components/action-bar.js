export default {
  template: `
    <native-action-bar ~actionBar v-bind="$attrs" v-on="$listeners">
      <slot></slot>
    </native-action-bar>
  `
}
