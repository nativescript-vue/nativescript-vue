const Vue = require('./nativescript-vue')
const VueRouter = require('vue-router')

Vue.use(VueRouter)

const Foo = {
  template: `
    <Page>
      <ActionBar :title="$route.path" />
      <StackLayout>
        <Label :text="$route.path" textWrap="true" />
        <Label text="Hi I'm foo!" style="text-align: center; color: #41b883; font-size: 30" />
        <Button text="Bar" @tap="$router.push('/bar')" />
        <Button text="Baz" @tap="$router.push('/baz')"></Button>
      </StackLayout>
    </Page>
  `
}
const Bar = {
  template: `
    <Page>
      <ActionBar :title="$route.path">
        <NavigationButton text="Back!" android.systemIcon="ic_menu_back" @tap="$router.back()" />
      </ActionBar>
      <StackLayout>
        <Label text="Hi I'm  bar!" style="text-align: center; color: #41b883; font-size: 30" />
        <Button text="Baz" @tap="$router.push('/baz')" />
      </StackLayout>
    </Page>
  `
}
const Baz = {
  template: `    
    <Page>
      <ActionBar :title="$route.path">
        <navigation-Button text="Back!" android.systemIcon="ic_menu_back" @tap="$router.back()" />
      </ActionBar>
      <StackLayout>
        <Label text="Hi I'm baz!" style="text-align: center; color: #41b883; font-size: 30" />
        <Button text="Bar" @tap="$router.push('/bar')" />
      </StackLayout>
    </Page>
  `
}

const router = new VueRouter({
  PageRouting: true,
  routes: [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
    { path: '/baz', component: Baz },
    { path: '*', redirect: '/foo' }
  ]
})

router.replace('/foo')

new Vue({
  router
}).$start()
