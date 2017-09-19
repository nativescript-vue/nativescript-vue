const Vue = require('./nativescript-vue')
const VueRouter = require('vue-router')
Vue.use(VueRouter)
global.process = { env: {} } // hack! a build process should replace process.env's with static strings.

const Foo = {
  template: `
    <page>
        <action-bar :title="$route.path"></action-bar>
        <stack-layout>
            <label style="text-align: center; color: #41b883; font-size: 30">Hi I'm foo!</label>
            <button @tap="$router.push('/bar')">Bar</button>
            <button @tap="$router.push('/baz')">Baz</button>
        </stack-layout>
    </page>
`
}
const Bar = {
  template: `
    <page>
        <action-bar :title="$route.path">
            <navigation-button text="Back!" android.systemIcon="ic_menu_back" @tap="$router.back()"></navigation-button>
        </action-bar>
        <stack-layout>
            <label style="text-align: center; color: #41b883; font-size: 30">Hi I'm  bar!</label>
        </stack-layout>
    </page>
`
}
const Baz = {
  template: `    
    <page>
        <action-bar :title="$route.path">
            <navigation-button text="Back!" android.systemIcon="ic_menu_back" @tap="$router.back()"></navigation-button>
        </action-bar>
        <stack-layout>
            <label style="text-align: center; color: #41b883; font-size: 30">Hi I'm baz!</label>
        </stack-layout>
    </page>
`
}

const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
    { path: '/baz', component: Baz },
    { path: '*', redirect: '/foo' }
  ]
})

router.push('/foo')

new Vue({
  router,
  template: `
        <page>
            <router-page/>
        </page>
    `
}).$start()
