const Vue = require('./nativescript-vue')
const VueRouter = require('vue-router')
const application = require('tns-core-modules/application')

Vue.config.silent = false
Vue.config.debug = true
Vue.use(VueRouter)

const Home = {
  template: `
    <Page>
        <StackLayout>
            <Button text="Go to details page..." @tap="$router.push('/detail/1')"/>
        </StackLayout>
    </Page>
  `
}

const Detail = {
  template: `
    <Page>
        <GridLayout rows="*, *, *">
            <Label :text="'Detail for ' + $route.params.id" row="0"/>
            <Button text="Tab 2" @tap="$router.replace($route.path + '/tab2')"/> 
            
            <router-view row="1" />
        </GridLayout>
    </Page>
  `
}

const DetailTab1 = {
  template: `
    <Label text="detail tab 1" />
  `
}

const DetailTab2 = {
  template: `
    <Label text="detail tab 2" />
  `
}

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    {
      path: '/detail/:id',
      component: Detail,
      children: [
        { path: '/', component: DetailTab1 },
        { path: 'tab2', component: DetailTab2 }
      ]
    },
    { path: '*', redirect: '/' }
  ]
})

router.push('/')

application.android.on('activityBackPressed', args => {
  if (router.history.stack.length > 1) {
    router.back()
    args.cancel = true
  }
})

new Vue({
  router,
  template: `
    <GridLayout rows="*, 80">
      <Frame row="0">
        <router-view :key="$route.path" />
      </Frame>
      
      <Label :text="$route.path"
            backgroundColor="#333" color="#eee" 
            row="1" />
    </GridLayout>  
  `
}).$start({
  getRootView(vm) {
    return vm.$el.nativeView
  }
})
