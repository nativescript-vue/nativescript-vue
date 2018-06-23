const Vue = require('./nativescript-vue')

Vue.config.debug = true
Vue.config.silent = false

new Vue({
  data: {
    foo: true
  },
  template: `
    <Frame>
      <Page>
        <ActionBar title="Issue #127" />
        
        <StackLayout>
          <Button @tap="foo = !foo" :text="foo"/>
          <Label v-show="foo" text="Enable" @tap="foo = false" style="padding: 50; background: red;"/>
          <Label v-show="!foo" text="Disable" @tap="foo = true" style="padding: 50; background: blue;"/>
        </StackLayout>
      </Page>
    </Frame>
  `,
  created() {
    console.log(Vue.compile(this.$options.template).render.toString())
  }
}).$start()
