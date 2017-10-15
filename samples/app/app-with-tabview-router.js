const Vue = require('./nativescript-vue')
const VueRouter = require('vue-router')
Vue.use(VueRouter)

const TabComponent = {
  template: `
    <tab-view @tabChange="onTabChange" :selectedTab="selectedTab">
        <tab-view-item title="First">
            <stack-layout>
                <label text="First"></label>
                <button @tap="$router.replace('/tab/2')">Go to 3rd</button>
            </stack-layout>
        </tab-view-item>
        <tab-view-item title="Second">
            <label text="Second"></label>
        </tab-view-item>
        <tab-view-item title="Third">
            <label text="Third"></label>
        </tab-view-item>
    </tab-view>
    `,

  computed: {
    selectedTab() {
      return this.$route.params.id
    }
  },

  methods: {
    onTabChange(index) {
      console.log('Tab changed ' + index)
      this.$route.params.id = index
    }
  }
}

const router = new VueRouter({
  routes: [
    { path: '/tab/:id', component: TabComponent },
    { path: '*', redirect: '/tab/0' }
  ]
})

setTimeout(() => {
  router.replace('/tab/1')
})

new Vue({
  router,
  template: `
        <page>
            <action-bar title="Tab Routing"></action-bar>
            
            <stack-layout>
                <router-view></router-view>
            </stack-layout>
        </page>
    `
}).$start()
