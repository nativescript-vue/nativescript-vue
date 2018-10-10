const Vue = require('./nativescript-vue')
const VueDevtools = require('nativescript-vue-devtools')
Vue.use(VueDevtools)
Vue.config.debug = true
Vue.config.silent = false

const CustomButton = {
  template: `<Button :text='text' @tap='$emit("tap", $event)' />`,
  props: ['text']
}

let step1_id = 0
const Step1 = {
  template: `
    <Page class="page">
      <ActionBar title="Home" class="action-bar" />
      <StackLayout>
        <StackLayout>
          <Label class="m-t-30" text="Welcome to step 1!" />
  
          <CustomButton text="This button only works if you stay on this tab" @tap="next" />
  
          <CustomButton text="This button always works" @tap.native="next" />
        </StackLayout>
      </StackLayout>
    </Page>
  `,
  components: { CustomButton },

  created() {
    console.log('Step 1 created.')
  },

  beforeDestroy() {
    console.log('Destroying step 1...')
  },

  destroyed() {
    console.log('Step 1 destroyed.')
  },

  methods: {
    next() {
      this.$navigateTo(Step2, { frame: 'second' })
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
      this.$navigateTo(Step3, { frame: 'second' })
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
      this.$navigateTo(Step1, { frame: 'second', clearHistory: true })
    }
  }
}

const FirstTab = {
  template: `
    <Page class="page">
      <ActionBar title="Home" class="action-bar" />
      <StackLayout>
        <Label class="m-t-30" textWrap="true" text="Tap on the second tab, then tap on this tab, and tap back over to the second tab. The top button will no longer work on the second tab's page."
        />
      </StackLayout>
    </Page>
  `
}

const TabBar = {
  template: `
    <GridLayout rows="*">
      <!--<keep-alive>-->
        <Frame id="first" v-show="screen == 0" key="0">
          <FirstTab />
        </Frame>
        <Frame id="second" v-show="screen == 1" key="1">
          <Step1 />
        </Frame>
      <!--</keep-alive>-->
  
      <StackLayout class="tabbar" orientation="horizontal" row="0">
        <Label class="tabbar__item" @tap="screen = 0" text="First" :class='{"tabbar__item--active": screen == 0}' />
        <Label class="tabbar__item" @tap="screen = 1" text="Second" :class='{"tabbar__item--active": screen == 1}' />
      </StackLayout>
    </GridLayout>
  `,
  components: { FirstTab, Step1 },

  data() {
    return {
      screen: 0
    }
  }
}

new Vue({
  render: h => h(TabBar)
}).$start()
