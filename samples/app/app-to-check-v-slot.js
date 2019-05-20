const Vue = require('nativescript-vue')

Vue.config.silent = false
Vue.config.debug = true

import VSlot from './components/VSlot'

new Vue({
  components: {
    VSlot
  },
  render: h => h('frame', [h(VSlot)])
}).$start()
