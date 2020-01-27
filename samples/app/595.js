const Vue = require('nativescript-vue')

Vue.config.debug = true
Vue.config.silent = false

Plugin = {
  install(Vue, name) {
    Vue.prototype.$name = name

    Vue.mixin({
      beforeCreate: function() {
        setTimeout(() => {
          console.log('this.$options: ', this.$options)
        }, 5000)
      }
    })
  }
}

Vue.use(Plugin, 'pluginName')

new Vue({
  data: {},
  template: `
    <Frame>
      <Page>
        <ActionBar title="Issue #595" />

        <StackLayout>
          <Label text="This app should not crash in 5 seconds" />
          <Label text="You will see a dump of this.$options in console" />
        </StackLayout>
      </Page>
    </Frame>
  `
}).$start()
