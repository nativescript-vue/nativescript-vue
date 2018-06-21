const Vue = require('./nativescript-vue')

Vue.config.debug = true
Vue.config.silent = false

const App = {
  template: `
    <Frame ref="frame">
      <Page>
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
