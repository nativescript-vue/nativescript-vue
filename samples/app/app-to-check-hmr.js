import Home from './components/Home'

const Vue = require('nativescript-vue')

Vue.config.silent = false
Vue.config.debug = true

new Vue({
  components: {
    Home
  },
  render: h => h('frame', [h(Home)])
}).$start()
