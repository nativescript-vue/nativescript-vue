const Vue = require('./nativescript-vue')

Vue.config.debug = true
Vue.config.silent = false

new Vue({
  data () {
    return {
      text: 'testing',
      labelCondition: false,
      selectedDate: new Date()
    }
  },
  template: `
    <Frame>
      <Page>
        <ActionBar title="App with all components" />

        <StackLayout class="m-t-20">
          <Label
            v-if="labelCondition"
            text="Label with labelCondition enabled. Tap me to disable"
            textWrap
            @tap="labelCondition = false"/>

          <Label
            v-else
            text="Label with labelCondition disabled. Tap me to enable"
            @tap="labelCondition = true"
            textWrap />

          <DatePicker
            v-model="selectedDate"
            @dateChange="onDateChanged" />

          <TextField
            v-model="text"
            @textChange="onTextChanged" />

        </StackLayout>
      </Page>
    </Frame>
  `,
  created () {
    console.log(Vue.compile(this.$options.template).render.toString())
  },
  methods: {
    onDateChanged () {
      console.log(`Date changed to ${this.selectedDate}`)
    },
    onTextChanged () {
      console.log(`Text changed to ${this.text}`)
    }
  }
}).$start()
