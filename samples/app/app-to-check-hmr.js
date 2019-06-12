const Vue = require('nativescript-vue')

Vue.config.silent = false
Vue.config.debug = true

import Home from './components/Home'

new Vue({
  components: {
    Home
  },
  render: h => h('frame', [h(Home)])
}).$start()
