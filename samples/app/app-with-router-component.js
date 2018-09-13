const Vue = require('./nativescript-vue')
const VueRouter = require('./vue-router')

Vue.config.silent = false
Vue.config.debug = true

const HomePage = {
  template: `
  <Page>
      <StackLayout>
          <Button text="Go To User" @tap="$router.push('/user/1')"/>
      </StackLayout>
  </Page>
`
}
const UserPage = {
  template: `
  <Page>
      <StackLayout>
          <Label :text="'User ' + $route.params.id"/>
          <Button text="Show profile" @tap="$router.push('/user/' + $route.params.id + '/profile')"/>
          <Button text="Show posts" @tap="$router.push('/user/' + $route.params.id + '/posts')"/>
          <router-view/>
      </StackLayout>
  </Page>
`
}

const UserProfile = {
  template: `<Label text="User profile goes here" />`
}

const UserPosts = {
  template: `
    <ListView for="i in [1, 2, 3, 4]">
      <v-template>
        <Label :text="'Post by user #' + i"/>
      </v-template>
    </ListView>
  `
}

Vue.use(VueRouter)

const router = new VueRouter({
  mode: Vue.mode,
  routes: [
    { path: '/', component: HomePage },
    {
      path: '/user/:id',
      component: UserPage,
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: 'profile',
          component: UserProfile
        },
        {
          // UserPosts will be rendered inside User's <router-view>
          // when /user/:id/posts is matched
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})

router.push('/')

new Vue({
  router,
  template: `<Frame><router-view/></Frame>`
}).$start()
