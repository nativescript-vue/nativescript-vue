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
        <ActionBar title="Issue #555" />

        <StackLayout>
          <Label text="You should see now a greeting dialog" />
        </StackLayout>
      </Page>
    </Frame>
  `,
  mounted() {
    // this dialog is not shown because when the Vue mounted event
    // is fired NS has not loaded all the UI components yet
    // so for being able to use it change the <Page> tag to:
    // <Page @loaded="greet"> instead of using the mounted event
    this.greet()
  },
  methods: {
    greet() {
      alert('Hello!').then(() => {
        console.log('Alert dialog closed.')
      })
    }
  }
}).$start()
