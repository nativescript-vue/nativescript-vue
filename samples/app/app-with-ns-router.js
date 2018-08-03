const Vue = require('./nativescript-vue');

Vue.config.silent = false
Vue.config.debug = true

const applicationSettings = require('tns-core-modules/application-settings')
const LoginSCN__LoadingPage = {
  data() {
    return {
      isLoggedIn: applicationSettings.getBoolean('isLoggedIn', false)
    }
  },
  template: `
  <Page @loaded="$router.replace(isLoggedIn ? '/home' : '/login')" />
`
}
const LoginSCN__HomePage = {
  template: `
  <Page>
      <StackLayout>
          <Button text="Do something (nav to home again...)" @tap="$router.push('/home')"/>
          <Button text="Log out" @tap="logout"/>
      </StackLayout>
  </Page>
`,
  methods: {
    logout() {
      applicationSettings.setBoolean('isLoggedIn', false)
      this.$router.replace('/login')
    }
  }
}
const LoginSCN__LoginPage = {
  template: `
  <Page>
      <StackLayout>
          <Button text="Login" @tap="login"/>
      </StackLayout>
  </Page>
`,
  methods: {
    login() {
      applicationSettings.setBoolean('isLoggedIn', true)
      this.$router.replace('/home')
    }
  }
}

Vue.use(Vue.Router)

const router = new Vue.Router({
  mode: { History: Vue.History },
  routes: [
    { path: '/', component: LoginSCN__LoadingPage },
    { path: '/home', component: LoginSCN__HomePage },
    { path: '/login', component: LoginSCN__LoginPage }
  ]
})

router.push('/')

new Vue({
  router,
  template: `<Frame :transition="$route === '/' ? 'fade' : 'slide'">
                 <router-view actionBarHidden="true"/>
             </Frame>`
}).$start()
