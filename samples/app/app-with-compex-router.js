const Vue = require('./nativescript-vue')
const VueRouter = require('vue-router')
Vue.use(VueRouter)

const Foo = {
  template: `
    <page>
        <action-bar :title="$route.path"></action-bar>
        <stack-layout>
            <label :text="$route.path" textWrap="true"></label>
            <label style="text-align: center; color: #41b883; font-size: 30">Hi I'm foo!</label>
            <button @tap="$router.push('/bar')">Bar</button>
            <router-link to="/test-router">Test router view</router-link>
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
            <router-link to="/test-router">Test router view</router-link>
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
            <router-link to="/bar">Baz</router-link>
        </stack-layout>
    </page>
`
}

const TestRouter = {
  template: `
    <page>
        <action-bar :title="pageTitle"></action-bar>
        <stack-layout>
            <stack-layout orientation="horizontal" horizontalAlignment="center" class="m-b-20">
                <router-link to="/foo-router" class="m-10">Foo</router-link>
                <router-link to="/bar-router/fizz" class="m-10">Bar</router-link>
            </stack-layout>

            <router-view></router-view>
        </stack-layout>
    </page>
`
}

const FooRouter = {
  template: `
    <stack-layout>
        <label style="text-align: center; color: #41b883; font-size: 30">Hi I'm foo!</label>
        <image src="~/images/vue.png" style="height: 200"></image>
    </stack-layout>
`
}

const BarRouter = {
  template: `
    <stack-layout>
        <button @tap="$router.replace('/bar-router/fizz')">I'm bar</button>
        <button @tap="$router.replace('/bar-router/buzz')">and I like buttons</button>
        <button>as you may tell</button>
        <button>:)</button>

        <router-view></router-view>
    </stack-layout>
`
}
const FizzRouter = {
  template: `
    <stack-layout>
        <label>Hi I'm fizz...</label>
    </stack-layout>
`
}

const BuzzRouter = {
  template: `
    <stack-layout>
        <label>Hi I'm buzz...</label>
    </stack-layout>
`
}

const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
    { path: '/baz', component: Baz },
    { path: '/test-router', component: TestRouter },
    { path: '/foo-router', component: FooRouter },
    {
      path: '/bar-router',
      component: BarRouter,
      children: [
        { path: 'fizz', component: FizzRouter },
        { path: 'buzz', component: BuzzRouter }
      ]
    },
    { path: '*', redirect: '/foo' }
  ]
})

router.replace('/baz')

new Vue({
  router,
  template: `<page>
        <action-bar :title="$route.path"></action-bar>
        <stack-layout>
            <label :text="$route.path" textWrap="true"></label>
            <label style="text-align: center; color: #41b883; font-size: 30">Hi I'm foo!</label>
            <image src="~/images/vue.png" style="height: 200"></image>
            <router-link to="/foo">Foo</router-link>
            <router-link to="/bar">Bar</router-link>
        </stack-layout>
    </page>`,
  created() {
    // this.$setPageTransition('slide', 1000)
  }
}).$start()
