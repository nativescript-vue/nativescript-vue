const Vue = require('./nativescript-vue')

Vue.config.debug = true
Vue.config.silent = false

new Vue({
  data() {
    return {
      timesPressed: 0,
      labelCondition: true,
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
            ref="date"
            v-model="selectedDate"
            @dateChange="onDateChanged" />

          <Button
            :text="buttonText"
            @tap="onButtonPress" />
        </StackLayout>
      </Page>
    </Frame>
  `,
  computed: {
    buttonText() {
      return this.timesPressed > 0
        ? `Pressed ${this.timesPressed} times`
        : 'Press me'
    }
  },
  methods: {
    onDateChanged() {
      console.log(`Date changed to ${this.selectedDate}`)
    },
    onButtonPress() {
      console.log('Button pressed')
      this.timesPressed++
    }
  },
  created() {
    console.log(Vue.compile(this.$options.template).render.toString())
  }
}).$start()
