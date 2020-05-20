const Vue = require('nativescript-vue')

Vue.config.debug = true
Vue.config.silent = false

new Vue({
  data() {
    return {
      boolValue: true
    }
  },
  template: `
      <StackLayout class="home-panel">
          <Button v-if="boolValue" text="Toggle 1" @tap="boolValue = !boolValue"></Button>
          <Button v-if="!boolValue" text="Toggle 2" @tap="boolValue = !boolValue"></Button>
          <Button text="Last Button!"></Button>
      </StackLayout>
  `
}).$start()
