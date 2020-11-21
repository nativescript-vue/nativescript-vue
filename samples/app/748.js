const Vue = require('nativescript-vue')

Vue.config.debug = true
Vue.config.silent = false

new Vue({
  data: {
    foo: false
  },
  template: `
    <Frame>
      <Page>
        <ActionBar title="Issue #748" />

        <StackLayout>
          <Button text="Only once" @tap.once="onlyOnce" />
        </StackLayout>
      </Page>
    </Frame>
  `,
  methods: {
    onlyOnce() {
      console.log('this log should only appear once')
    }
  }
}).$start()
