const Vue = require('nativescript-vue')
import ListViewTest from './components/ListViewTest'
import CollectionView from 'nativescript-collectionview/vue'

Vue.use(CollectionView)

Vue.config.debug = true
Vue.config.silent = false

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
