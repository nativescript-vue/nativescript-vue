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
        <ActionBar title="Issue #127" />

        <StackLayout>
          <Label v-if="foo" text="Enable" @tap="foo = false"/>
          <Label v-else text="Disable" @tap="foo = true"/>
        </StackLayout>
      </Page>
    </Frame>
  `,
  created() {
    console.log(Vue.compile(this.$options.template).render.toString())
  }
}).$start()
