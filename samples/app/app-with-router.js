const Vue = require('nativescript-vue')
const VueRouter = require('vue-router')

Vue.config.silent = false
Vue.config.debug = true
Vue.config.errorHandler = (e, vm, info) => {
  console.log('+'.repeat(80))
  console.log(e, vm, info)
  console.dir(e)
  console.log('+'.repeat(80))
}
Vue.use(VueRouter)

const Foo = {
  template: `
    <StackLayout>
        <Label text="Hi I'm foo!" style="text-align: center; color: #41b883; font-size: 30" />
        <Image src="~/images/vue.png" style="height: 200" />
    </StackLayout>
`
}
const Bar = {
  template: `
    <StackLayout>
      <Button text="I'm bar" @tap="$router.replace('/bar/fizz')" />
      <Button text="and I like Buttons" @tap="$router.replace('/bar/buzz')" />
      <Button text="as you may tell" />
      <Button text=":)" />

      <router-view />
    </StackLayout>
  `
}
const Fizz = {
  template: `
    <StackLayout>
      <Label text="Hi I'm fizz..." />
    </StackLayout>
  `
}
const Buzz = {
  template: `
    <StackLayout>
      <Label text="Hi I'm buzz..." />
    </StackLayout>
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
    <Frame>
      <Page ref="page">
        <ActionBar :title="pageTitle" />
        <StackLayout>
          <StackLayout orientation="horizontal" horizontalAlignment="center" class="m-b-20">
            <Button text="Foo" @tap="changeRoute('/foo')" class="m-10" />
            <Button text="Bar" @tap="changeRoute('/bar')" class="m-10" />
          </StackLayout>
          <transition name="fade" :duration="1000" mode="out-in">
            <router-view />
          </transition>
        </StackLayout>
      </Page>
    </Frame>
  `,

  methods: {
    changeRoute(to) {
      this.pageTitle = 'Current route: ' + to
      router.replace(to)
    }
  }
}).$start({
  getRootView(vm) {
    return vm.$el.nativeView
  }
})
