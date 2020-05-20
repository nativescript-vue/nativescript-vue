const Vue = require('nativescript-vue')

Vue.config.debug = true
Vue.config.silent = false

// console.log(Vue.compile('<Switch v-model="arrival" color="red"/>').render.toString())

new Vue({
  data() {
    return {
      currentStep: 0,
      departure: false,
      arrival: false
    }
  },
  template: `
      <StackLayout>
          <Button :text="\`Step 0 - \${departure}\`" :color="currentStep === 0 ? 'green' : 'black'" @tap="currentStep = 0"/>
          <Button :text="\`Step 1 - \${arrival}\`" :color="currentStep === 1 ? 'green' : 'black'"  @tap="currentStep = 1"/>
          <Button text="Toggle" @tap="departure = !departure"/>
          <GridLayout v-if="currentStep===0">
              <Switch v-model="departure" color="blue"/>
          </GridLayout>
          <GridLayout v-else-if="currentStep===1">
              <Switch v-model="arrival" color="red"/>
          </GridLayout>
      </StackLayout>
  `
}).$start()
