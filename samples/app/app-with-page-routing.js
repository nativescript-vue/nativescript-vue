const Vue = require('./nativescript-vue')
const VueRouter = require('vue-router')

Vue.config.silent = false
Vue.config.debug = true

Vue.use(VueRouter)

const data = {
  items: [
    {
      id: 1,
      title: 'First Item',
      text: 'This is the first item, which is very shiny and fabulous.'
    },
    {
      id: 2,
      title: 'Second Item',
      text: 'This is the second item, which is also very shiny and fabulous.'
    },
    {
      id: 3,
      title: 'Third Item',
      text:
        'This is the third item, which has been added to this list just because.'
    }
  ]
}

const DetailPage = {
  data() {
    return {
      items: data.items
    }
  },
  computed: {
    current() {
      return this.items.find(item => item.id === +this.$route.params.id)
    }
  },
  template: `
    <Frame>
      <Page>
        <ActionBar title="Detail Page">
          <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.back()" />
        </ActionBar>
        <StackLayout>
          <Label v-if="current" :text="current.text" textWrap="true" />


          <Label text="Related" />
          <Label text="Second Item" @tap="$router.replace('/detail/2')" style="color: blue; text-decoration: underline;" />
        </StackLayout>
      </Page>
    </Frame>
  `
}
const MasterPage = {
  data() {
    return {
      items: data.items
    }
  },
  template: `
    <Page>
      <ActionBar title="MasterPage" />
      <GridLayout>
        <ListView for="item in items" @itemTap="onItemTap" separatorColor="transparent">
          <v-template>
            <GridLayout style="border-bottom-width: 2; border-bottom-color: red;">
              <Label :text="item.title" style="padding: 20"/>
            </GridLayout>
          </v-template>
        </ListView>
      </GridLayout>
    </Page>
  `,

  methods: {
    onItemTap({ item }) {
      this.$router.push(`/detail/${item.id}`)
    }
  }
}

const router = new VueRouter({
  pageRouting: true,
  routes: [
    { path: '/', component: MasterPage },
    { path: '/detail/:id', component: DetailPage },
    { path: '*', redirect: '/' }
  ]
})

router.replace('/')

new Vue({
  router
}).$start()
