const Vue = require('./nativescript-vue')

Vue.config.debug = true
Vue.config.silent = false

new Vue({
  data: {
    labelCondition: false
  },
  template: `
    <Frame>
      <Page>
        <ActionBar title="App with all components" />

        <StackLayout>
          <Label v-if="labelCondition" text="Enable" @tap="labelCondition = false"/>
          <Label v-if="!labelCondition" text="Disable" @tap="labelCondition = true"/>

        </StackLayout>
      </Page>
    </Frame>
  `,
  created() {
    console.log(Vue.compile(this.$options.template).render.toString())
  }
}).$start()
