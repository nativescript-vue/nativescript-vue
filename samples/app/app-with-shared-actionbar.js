const Vue = require('./nativescript-vue')
const VueDevtools = require('nativescript-vue-devtools')

Vue.use(VueDevtools)

Vue.config.silent = false
Vue.config.debug = true

let id = 1

const page = name => ({
  template: `
    <Page actionBarHidden="true">
        <GridLayout>
            <Label text="${name}" />
        </GridLayout>
    </Page>
  `
})

new Vue({
  template: `
    <GridLayout rows="auto, *">
      <GridLayout row="0" columns="auto, *, auto" padding="10" background="#191E38" color="#ffffff">
        <Label col="0" text="<<<" @tap="backward"/>
        <Label col="1" text="Title" marginLeft="20" />
        <Label col="2" text=">>>" @tap="forward" />
      </GridLayout>
      
      <ContentView  row="1">
        <Frame>
          <HomePage />
        </Frame>
      </ContentView>
    </GridLayout>  
  `,
  methods: {
    forward() {
      this.$navigateTo(page('OtherPage ID:' + id++))
    },

    backward() {
      this.$navigateBack()
    }
  },
  components: {
    HomePage: page('Home')
  }
}).$start()
