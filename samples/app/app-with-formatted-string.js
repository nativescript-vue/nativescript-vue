const Vue = require('nativescript-vue')

Vue.config.silent = false

new Vue({
  template: `
  <Frame>
    <Page>
      <Label @tap="toggle = !toggle">
        <FormattedString>
          <Span text="some" fontWeight="Bold" />
          <Span text="content" />
          <Span v-if="toggle" text="toggled span" color="red" />
        </FormattedString>
      </Label>
    </Page>
  </Frame>
  `,

  comments: true,
  data() {
    return {
      toggle: false
    }
  }
}).$start()
