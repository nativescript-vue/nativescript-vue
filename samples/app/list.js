const Vue = require('nativescript-vue')
import ListViewTest from './components/ListViewTest'
import VueDevtools from 'nativescript-vue-devtools'

Vue.use(VueDevtools)

// Vue.config.debug = true
// Vue.config.silent = false

new Vue({
  template: `
      <Frame>
          <ListViewTest/>
      </Frame>
  `,
  components: {
    ListViewTest
  }
}).$start()
