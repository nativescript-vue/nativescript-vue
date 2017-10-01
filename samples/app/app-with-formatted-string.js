const Vue = require('./nativescript-vue')

new Vue({
  template: `
        <Label>
            <FormattedString>
                <Span text="some" fontWeight="Bold"></Span>
                <Span text="content"></Span>
            </FormattedString>
        </Label>
    `,

  comments: true
}).$start()
