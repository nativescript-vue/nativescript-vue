const Vue = require('./nativescript-vue')

Vue.config.debug = true
Vue.config.silent = false

new Vue({
  data() {
    return {
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
            v-if="!labelCondition"
            text="Label with labelCondition disabled. Tap me to enable"
            @tap="labelCondition = true"
            textWrap />

          <DatePicker
            v-model="selectedDate"
            @dateChange="onDateChanged" />
        </StackLayout>
      </Page>
    </Frame>
  `,
  created() {
    console.log(Vue.compile(this.$options.template).render.toString())
  },
  methods: {
    onDateChanged() {
      console.log(`Date changed to ${this.selectedDate}`)
    }
  }
}).$start()
