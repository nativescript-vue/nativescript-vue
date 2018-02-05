const Vue = require('./nativescript-vue')

const App = {
  template: `
    <StackLayout>
      <Button text="Open page" @tap="openPage" />
    </StackLayout>
  `,

  methods: {
    openPage() {
      this.$navigateTo(DetailsPage)
    }
  }
}

const DetailsPage = {
  template: `
    <StackLayout>
      <Label :text="'Details ' + Math.random()" />
      <Button text="another" @tap="openDetails" />
      <Button text="back" @tap="goBack" />
    </StackLayout>
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
