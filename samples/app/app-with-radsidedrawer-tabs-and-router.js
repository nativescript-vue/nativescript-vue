const Vue = require('nativescript-vue')
const VueRouter = require('vue-router')

Vue.registerElement(
  'RadSideDrawer',
  () => require('nativescript-ui-sidedrawer').RadSideDrawer
)

Vue.config.silent = false
Vue.config.debug = true
Vue.use(VueRouter)

const Home = {
  template: `
    <StackLayout>
      <Label text="home" />
    </StackLayout>
  `
}

const Tabs = {
  template: `
  <GridLayout>
    <TabView androidTabsPosition="bottom"
      :selectedIndex="selectedTabIndex" >
      <TabViewItem title="Tab 1">
        <StackLayout>
          <Label text="You are on Tab 1" />
        </StackLayout>
      </TabViewItem>
      <TabViewItem title="Tab 2">
        <StackLayout>
          <Label text="You are on Tab 2" />
        </StackLayout>
      </TabViewItem>
    </TabView>
  </GridLayout>`,
  data() {
    return {
      selectedTabIndex: 0,
      gaugeValue: 0.2
    }
  }
}

const HelloWorld1 = {
  template: `
    <StackLayout>
      <Label text="Hello world"></Label>
    </StackLayout>
  `
}

const HelloWorld2 = {
  template: `
    <StackLayout>
      <Label text="Hello world again!"></Label>
    </StackLayout>
  `
}

const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/hello1',
      component: HelloWorld1
    },
    {
      path: '/hello2',
      component: HelloWorld2
    },
    {
      path: '/tabs',
      component: Tabs
    },
    { path: '*', redirect: '/home' }
  ]
})

new Vue({
  router,
  template: `
    <Frame transition="fade">
      <Page>
        <ActionBar class="action-bar" title="Home" >
          <ActionItem text="Menu" @tap="$refs.drawer.nativeView.showDrawer()"/>
        </ActionBar>

        <RadSideDrawer ref="drawer" showOverNavigation="true" style="height:100%">
          <StackLayout ~drawerContent>
            <Button text="Home" @tap="$router.push('/home'); $refs.drawer.nativeView.closeDrawer() "/>
            <Button text="Hello1" @tap="$router.push('/hello1'); $refs.drawer.nativeView.closeDrawer() "/>
            <Button text="Hello2" @tap="$router.push('/hello2'); $refs.drawer.nativeView.closeDrawer() "/>
            <Button text="Tabs" @tap="$router.push('/tabs'); $refs.drawer.nativeView.closeDrawer()"/>
          </StackLayout>
          <StackLayout ~mainContent>
            <router-view></router-view>
          </StackLayout>
        </RadSideDrawer>
      </Page>
    </Frame>
`,
  data() {
    return {}
  },
  created() {
    this.$router.push('/home')
  }
}).$start()
