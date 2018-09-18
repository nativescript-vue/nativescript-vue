const Vue = require('./nativescript-vue')

Vue.config.silent = false
Vue.config.debug = true

const createPage = title =>
  new Vue({
    template: `<Page><Foo/></Page>`,
    components: {
      Foo: {
        template: `<Label text="${title}"/>`,
        created() {
          this.intv = setInterval(
            () => console.log(`[${title}] INTERVAL FIRED.`),
            1000
          )
        },
        destroyed() {
          clearInterval(this.intv)
        }
      }
    }
  }).$mount().$el.nativeView

new Vue({
  template: `
    <Frame ref="frame" 
        @navigated="log('navigated')"
        @navigatedBack="log('navigatedBack')"
    >
      <Page><Button text="Page" @tap="navigate" /></Page>
    </Frame>
  `,

  methods: {
    navigate() {
      this.$refs.frame.navigate({
        create() {
          return createPage('test')
        }
      })
    },
    log(name) {
      console.log('FRAME EVENT: ' + name)
    }
  }
}).$start()
