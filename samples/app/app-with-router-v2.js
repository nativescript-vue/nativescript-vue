const Vue = require('nativescript-vue')
const VueRouter = require('vue-router')

Vue.config.silent = false
Vue.config.debug = true
Vue.use(VueRouter)

const Home = {
  template: `
    <Page>
        <StackLayout>
            <Button text="Go to details page 1..." @tap="$router.push('/detail/1', {
                transition: 'slide'
            })"/>
            <Button text="Go to details page 2..." @tap="$router.push('/detail/2')"/>
        </StackLayout>
    </Page>
  `
}

const Detail = {
  template: `
    <Page>
        <StackLayout>
            <Label :text="'Detail page for ' + $route.params.id"/>
            <Button text="go to Tab 2 of the current page" @tap="$router.push($route.path + '/tab2')"/>

            <router-view/>
        </StackLayout>
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

new Vue({
  router,
  template: `
    <GridLayout rows="*, 40">
      <Frame row="0" transition="fade">
        <router-view />
      </Frame>

      <Label :text="$route.path"
            backgroundColor="#333" color="#eee"
            row="1" />
    </GridLayout>
  `
}).$start()
