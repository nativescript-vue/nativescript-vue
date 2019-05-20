const Vue = require('nativescript-vue')

Vue.config.debug = true
Vue.config.silent = false

const App = {
  template: `
  <Frame>
    <Page>
      <ActionBar class="action-bar" title="Home Page">
        <ActionItem text="Action"></ActionItem>
      </ActionBar>
      <StackLayout>
        <Button text="Open page" @tap="openPage" />
      </StackLayout>
    </Page>
  </Frame>
  `,

  methods: {
    openPage() {
      this.$navigateTo(DetailsPage)
    }
  }
}

const DetailsPage = {
  template: `
  <Page>
    <ActionBar class="action-bar" title="Details Page">
      <ActionItem text="Action"></ActionItem>
    </ActionBar>
    <StackLayout>
      <Label :text="'Details ' + Math.random()" />
      <Button text="another" @tap="openDetails" />
      <Button text="back" @tap="goBack" />
    </StackLayout>
  </Page>
  `,

  methods: {
    openDetails() {
      this.$navigateTo(DetailsPage)
    },
    goBack() {
      this.$navigateBack()
    }
  }
}

new Vue({
  render: h => h(App)
}).$start()
