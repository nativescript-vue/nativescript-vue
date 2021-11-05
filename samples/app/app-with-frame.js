import Vue from 'nativescript-vue'

Vue.config.silent = false
Vue.config.debug = true

const createPage = title => ({
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
})

new Vue({
  template: `
    <Frame @navigated="log('navigated')"
        @navigatedBack="log('navigatedBack')"
    >
      <Page><Button text="Page" @tap="navigate" /></Page>
    </Frame>
  `,

  methods: {
    navigate() {
      this.$navigateTo(createPage('test'))
    },
    log(name) {
      console.log('FRAME EVENT: ' + name)
    }
  }
}).$start()
