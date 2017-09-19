const Vue = require('./nativescript-vue')
const VueRouter = require('vue-router')
Vue.use(VueRouter)
global.process = { env: {} } // hack! a build process should replace process.env's with static strings.

const Foo = {
  template: `
    <stack-layout>
        <label style="text-align: center; color: #41b883; font-size: 30">Hi I'm foo!</label>
        <image src="~/images/vue.png" style="height: 200"></image>
    </stack-layout>
`
}
const Bar = {
  template: `
    <stack-layout>
        <button @tap="$router.replace('/bar/fizz')">I'm bar</button>
        <button @tap="$router.replace('/bar/buzz')">and I like buttons</button>
        <button>as you may tell</button>
        <button>:)</button>

        <router-view></router-view>
    </stack-layout>
`
}
const Fizz = {
  template: `
    <stack-layout>
        <label>Hi I'm fizz...</label>
    </stack-layout>
`
}
const Buzz = {
  template: `
    <stack-layout>
        <label>Hi I'm buzz...</label>
    </stack-layout>
`
}

const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo },
    {
      path: '/bar',
      component: Bar,
      children: [
        { path: 'fizz', component: Fizz },
        { path: 'buzz', component: Buzz }
      ]
    },
    { path: '*', redirect: '/foo' }
  ]
})

router.replace('/foo')

new Vue({
  router,

  data: {
    pageTitle: 'Current route: /foo'
  },

  template: `
        <page ref="page">
            <action-bar :title="pageTitle"></action-bar>
            <stack-layout>
                <stack-layout orientation="horizontal" horizontalAlignment="center" class="m-b-20">
                    <button @tap="changeRoute('/foo')" class="m-10">Foo</button>
                    <button @tap="changeRoute('/bar')" class="m-10">Bar</button>
                </stack-layout>

                <router-view></router-view>
            </stack-layout>
        </page>
    `,

  methods: {
    changeRoute(to) {
      this.pageTitle = 'Current route: ' + to
      router.replace(to)
    }
  }
}).$start()
