const Vue = require('nativescript-vue')
const { ObservableArray } = require('@nativescript/core')

Vue.config.debug = true
Vue.config.silent = false

new Vue({
  data: {
    items: new ObservableArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  },
  methods: {
    onItemTap({ item }) {
      this.items.push(`Item clicked: ${item} (shouldn't be \`undefined\`)`)
    }
  },
  template: `
    <Frame>
      <Page class="page">
        <ActionBar title="Home" class="action-bar" />
        <ScrollView>
          <ListView for="item in items" @itemTap="onItemTap">
            <v-template>
              <Label :text="item"/>
            </v-template>
          </ListView>
        </ScrollView>
      </Page>
    </Frame>`
}).$start()
