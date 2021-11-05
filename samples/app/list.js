import Vue from 'nativescript-vue'
import ListViewTest from './components/ListViewTest'

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
