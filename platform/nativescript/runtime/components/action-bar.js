export default {
  template: `
    <NativeActionBar ~actionBar v-bind="$attrs" v-on="$listeners">
      <slot />
    </NativeActionBar>
  `
}
