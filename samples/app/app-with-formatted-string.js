const Vue = require('./nativescript-vue')

new Vue({
  template: `
    <Label>
      <FormattedString>
        <Span text="some" fontWeight="Bold" />
        <Span text="content" />
      </FormattedString>
    </Label>
  `,

  comments: true
}).$start()
