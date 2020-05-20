const Vue = require('nativescript-vue')

Vue.config.debug = true
Vue.config.silent = false

// console.log(Vue.compile('<Switch v-model="arrival" color="red"/>').render.toString())

new Vue({
  data() {
    return {
      items: [
        { switch: false, value: 'Item 1' },
        { switch: false, value: 'Item 2' },
        { switch: false, value: 'Item 3' },
        { switch: false, value: 'Item 4' },
        { switch: false, value: 'Item 5' },
        { switch: false, value: 'Item 6' },
        { switch: false, value: 'Item 7' },
        { switch: false, value: 'Item 8' },
        { switch: false, value: 'Item 9' },
        { switch: false, value: 'Item 10' },
        { switch: false, value: 'Item 11' },
        { switch: false, value: 'Item 12' },
        { switch: false, value: 'Item 13' },
        { switch: false, value: 'Item 14' },
        { switch: false, value: 'Item 15' },
        { switch: false, value: 'Item 16' },
        { switch: false, value: 'Item 17' },
        { switch: false, value: 'Item 18' },
        { switch: false, value: 'Item 19' },
        { switch: false, value: 'Item 20' }
      ]
    }
  },
  template: `
      <ListView for="item in items">
          <v-template>
              <GridLayout padding="24" columns="*, auto, auto">
                  <TextField v-model="item.value"/>
                  <Label :text="item.switch" col="1"/>
                  <Switch v-model="item.switch" col="2"/>
              </GridLayout>
          </v-template>
      </ListView>
  `
}).$start()
