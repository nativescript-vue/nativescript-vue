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
        @beforePush="log('beforePush')"
        @beforeReplace="log('beforeReplace')"
        @beforeBack="log('beforeBack')"
        @push="log('push')"
        @replace="log('replace')"
        @back="log('back')"
    >
      <Page><Button text="Page" @tap="replace" /></Page>
    </Frame>
  `,

  methods: {
    replace() {
      this.$refs.frame.push({
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
