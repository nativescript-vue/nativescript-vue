const Vue = require('nativescript-vue')

Vue.config.silent = false

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

const pageComponent = title => ({
  template: `
        <Page>
            <Label text="${title}" />
        </Page>
    `
})

let app = new Vue({
  data() {
    return {
      showSecondFrame: true
    }
  },
  template: `
    <GridLayout rows="*, auto, *">
        <ContentView row="0">
            <Frame>
                ${pageComponent('[top frame] Page 1').template}
            </Frame>
        </ContentView>
        <Label row="1" text="--- SEPARATOR ---" textAlignment="center" backgroundColor="#eee" />
        <ContentView row="2" backgroundColor="rgba(255, 0, 0, 0.1)">
            <Frame v-if="showSecondFrame">
                ${pageComponent('[bottom frame] Page 2').template}
            </Frame>
            <Label v-else text="No more frame here..." color="red" verticalAlignment="center" textAlignment="center" />
        </ContentView>
    </GridLayout>
  `,
  mounted() {
    this.testNavigations().catch(err => {
      console.log(err)
    })
  },
  methods: {
    async testNavigations() {
      await wait(3000)
      this.$navigateTo(pageComponent('[bottom frame] Page 3'))
      await wait(3000)
      this.showSecondFrame = false
      await wait(3000)
      this.$navigateTo(pageComponent('[top frame] Page 4'))
    }
  }
})

app.$start()
