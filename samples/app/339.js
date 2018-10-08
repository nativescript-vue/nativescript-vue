const Vue = require('./nativescript-vue')

Vue.config.debug = true
Vue.config.silent = false

let step1_id = 0
const Step1 = {
  template: `
    <Page class="page">
      <ActionBar title="Home" class="action-bar" />
      <StackLayout>
        <Label text="Welcome to step 1!" />
        <Button text="Thanks! Step 2 please." @tap="next" />
      </StackLayout>
    </Page>
  `,
  created() {
    console.log('Step 1 created.')
    this.stepid = ++step1_id
    this.interval = setInterval(() => {
      console.log(`[${this.stepid}] step 1 is alive`)
    }, 1000)
  },
  beforeDestroy() {
    console.log('Destroying step 1...')
  },
  destroyed() {
    console.log('Step 1 destroyed.')
    clearInterval(this.interval)
  },
  methods: {
    next() {
      this.$navigateTo(Step2)
    }
  }
}

const Step2 = {
  template: `
    <Page class="page">
      <ActionBar title="Home" class="action-bar" />
      <StackLayout>
        <Label text="Welcome to step 2!" />
        <Button text="Great, time for step 3." @tap="next" />
      </StackLayout>
    </Page>
  `,
  created() {
    console.log('Step 2 created.')
  },
  beforeDestroy() {
    console.log('Destroying step 2...')
  },
  destroyed() {
    console.log('Step 2 destroyed.')
  },
  methods: {
    next() {
      this.$navigateTo(Step3, { transition: 'slideTop' })
    }
  }
}

const Step3 = {
  template: `
    <Page class="page">
      <ActionBar title="Home" class="action-bar" />
      <StackLayout>
        <Label text="You made it to the last step!" />
        <Button text="Cool, start over." @tap="reset" />
      </StackLayout>
    </Page>
  `,
  created() {
    console.log('Step 3 created.')
  },
  beforeDestroy() {
    console.log('Destroying step 3...')
  },
  destroyed() {
    console.log('Step 3 destroyed.')
  },
  methods: {
    reset() {
      this.$navigateTo(Step1, { clearHistory: true })
    }
  }
}

new Vue({
  render: h => h('frame', [h(Step1)])
}).$start()
