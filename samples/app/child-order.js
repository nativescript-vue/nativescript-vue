const Vue = require('nativescript-vue')
import ChildOrder from './components/ChildOrder'

Vue.config.debug = true
Vue.config.silent = false

new Vue({
  template: `
      <Frame>
          <ChildOrder/>
      </Frame>
  `,
  components: {
    ChildOrder
  }
}).$start()
