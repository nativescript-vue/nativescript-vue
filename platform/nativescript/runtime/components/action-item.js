export default {
  template: `
    <NativeActionItem ref="actionItem" v-bind="$attrs" v-on="$listeners">
      <slot></slot>
    </NativeActionItem>
  `
}
