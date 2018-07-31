const Vue = require('./nativescript-vue')

Vue.config.debug = true
Vue.config.silent = false

class User {
  constructor(name) {
    this.name = name.toUpperCase()
  }
}

new Vue({
  template: `
  <Frame>
    <Page class="page">
      <ActionBar title="Issue #272" class="action-bar" />
      <StackLayout>
        <ListView
          for="user in userList">
          <v-template>
            <StackLayout>
              <Label
                :text="user.name"
                @tap="onTap" />
            </StackLayout>
          </v-template>
        </ListView>
      </StackLayout>
    </Page>
  </Frame>
  `,
  data() {
    return {
      userList: [new User('John'), new User('Paul')]
    }
  },
  methods: {
    onTap({ object }) {
      console.log(`Tapped on ${object.text}`)
    }
  }
}).$start()
