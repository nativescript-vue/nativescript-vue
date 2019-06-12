import Home from './components/Home'

const Vue = require('nativescript-vue')
const application = require('tns-core-modules/application')
const platform = require('tns-core-modules/platform')

Vue.config.silent = false
Vue.config.debug = true

new Vue({
  components: {
    Home
  },
  render: h => h('frame', [h(Home)])
}).$start()
