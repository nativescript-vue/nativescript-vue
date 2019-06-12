const Vue = require('nativescript-vue')

new Vue({
  template: `
  <Frame>
    <Page>
      <Label>
        <FormattedString>
          <Span text="some" fontWeight="Bold" />
          <Span text="content" />
        </FormattedString>
      </Label>
    </Page>
  </Frame>
  `,

  comments: true
}).$start()
