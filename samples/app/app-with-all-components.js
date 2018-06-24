const Vue = require('./nativescript-vue')

Vue.config.debug = true
Vue.config.silent = false

new Vue({
  data() {
    return {
      activeTab: 0,
      tabs: [
        { key: 'form', title: 'Form' },
        { key: 'list', title: 'List' },
        { key: 'other', title: 'Other' },
      ],
      timesPressed: 0,
      labelCondition: true,
      selectedDate: new Date(),
    }
  },
  template: `
  <Page>
    <ActionBar title="test">
    </ActionBar>
    <StackLayout>
      <TabView v-model="activeTab">
        <TabViewItem v-for="(tab, i) in tabs" :key="i + tab.title" :title="tab.title">
          <StackLayout v-show="isTabActive('form')" class="tab">
            <Label
              v-if="labelCondition"
              ref="label1"
              style="margin-top: 10"
              text="Label with labelCondition enabled. Tap me to disable"
              textWrap
              @tap="labelCondition = false"/>
            <Label
              v-else
              ref="label2"
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
        </TabViewItem>
      </TabView>
    </StackLayout>
  </Page>
`,
  computed: {
    buttonText() {
      return this.timesPressed > 0
        ? `Pressed ${this.timesPressed} times`
        : 'Press me'
    }
  },
  methods: {
    isTabActive(key) {
      return this.tabs[this.activeTab].key === key
    },
    onDateChanged() {
      console.log(`Date changed to ${this.selectedDate}`)
    },
    onButtonPress() {
      console.log('Button pressed')
      this.timesPressed++
    },
  },
  created() {
    console.log(Vue.compile(this.$options.template).render.toString())
  },
  mounted() {
    Object.keys(this.$refs).map((key) => {
      console.dir(`this.$refs.${key} ->`)
      console.dir(this.$refs[key])
    })
  },
}).$start()
