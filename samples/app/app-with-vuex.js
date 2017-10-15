const Vue = require('./nativescript-vue')
const Vuex = require('vuex')

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 42
  },

  mutations: {
    decrement(state) {
      state.count--
    }
  }
})

new Vue({
  store,
  template: `
    <Page>
        <Stack-Layout>
            <Label :text="count + ' taps left'" style="text-align: center; font-size: 30; padding: 20 0;"/>
            <Button text="Tap" @tap="decrement"/>
        </Stack-Layout>
    </Page> 
  `,

  computed: {
    count() {
      return this.$store.state.count
    }
  },

  methods: {
    decrement() {
      this.$store.commit('decrement')
    }
  }
}).$start()
