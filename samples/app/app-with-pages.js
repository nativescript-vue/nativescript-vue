const Vue = require('nativescript-vue')

const VueDevtools = require('nativescript-vue-devtools')
Vue.use(VueDevtools)

Vue.config.devtools = true
Vue.config.debug = false //true
Vue.config.silent = false

const ToggledComp = {
  template: `<Label text="im toggled" />`
}

const DefaultPage = {
  name: 'DefaultPage',

  components: { ToggledComp },
  template: `
  <Page>
    <ActionBar class="action-bar" title="Home Page">
      <ActionItem text="Action"></ActionItem>
    </ActionBar>
    <StackLayout>
      <Button text="Open page" @tap="openPage" />
    </StackLayout>
  </Page>`,

  methods: {
    openPage() {
      this.$navigateTo(DetailsPage)
    }
  }
}

const DetailsPage = {
  name: 'DetailsPage',
  template: `
  <Page>
    <ActionBar class="action-bar" title="Details Page">
      <ActionItem text="Action"></ActionItem>
    </ActionBar>
    <StackLayout>
      <Label :text="'Details ' + Math.random()" />
      <Button text="another" @tap="openDetails({})" />
      <Button text="another backstackVisible=false" @tap="openDetails({backstackVisible: false})" />
      <Button text="another clearHistory=true" @tap="openDefault({clearHistory: true})" />
      <Button text="back" @tap="goBack" />
    </StackLayout>
  </Page>
  `,

  methods: {
    openDetails(options = {}) {
      this.$navigateTo(DetailsPage, options)
    },
    openDefault(options) {
      this.$navigateTo(DefaultPage, options)
    },
    goBack() {
      this.$navigateBack()
    }
  }
}

const App = {
  name: 'App',
  components: { DefaultPage },
  template: `
  <Frame>
    <DefaultPage/>
  </Frame>
  `
}

new Vue({
  render: h => h(App)
}).$start()
