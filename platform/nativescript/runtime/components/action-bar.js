import { warn } from 'core/util/debug'

export default {
  name: 'action-bar',

  template: `
    <native-action-bar ref="actionBar" :title="title">
        <slot></slot>
    </native-action-bar>
  `,

  props: {
    title: {
      type: String,
      required: false
    }
  },

  mounted() {
    this.$nextTick(() => {
      if (this.$parent.$el.tagName.toLowerCase() !== 'page') {
        warn(
          'Make sure you are placing the <ActionBar> component as a direct child of a <Page> element.'
        )
        return
      }

      const page = this.$parent.$el.nativeView

      page.actionBar = this.$refs.actionBar.nativeView
      page.actionBarHidden = false
    })
  },
}
