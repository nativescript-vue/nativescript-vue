const Vue = require('nativescript-vue/dist/index')
const VueRouter = require('vue-router')
Vue.use(VueRouter)
global.process = {env: {}} // hack! a build process should replace process.env's with static strings.

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
        {path: '/foo', component: Foo},
        {
            path: '/bar', component: Bar,
            children: [
                {path: 'fizz', component: Fizz},
                {path: 'buzz', component: Buzz}
            ]
        },
        {path: '*', redirect: '/foo'}
    ]
})

router.replace('/foo')

new Vue({
    router,

    template: `
        <page>
            <stack-layout>
                <stack-layout orientation="horizontal">
                    <button @tap="$router.replace('/foo')">Foo</button>
                    <button @tap="$router.replace('/bar')">Bar</button>
                </stack-layout>
                
                <label style="text-align: center">Current route: {{ $route.fullPath }}</label>
                
                <router-view></router-view>
            </stack-layout>
        </page>
    `,
}).$start()