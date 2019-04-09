const Vue = require('nativescript-vue')
const Pager = require('nativescript-pager/vue')

Vue.use(Pager)

Vue.config.debug = true
Vue.config.silent = false

new Vue({
  data() {
    return {
      selected: 2
    }
  },
  template: `
    <Frame>
      <Page>
        <StackLayout>
          <Button text="go to first" @tap="selected = 0"/>
          <Button text="go to last" @tap="selected = 3"/>

          <Pager for="i in [0,1,2,3]" v-model="selected" pagesCount="4">
            <v-template>
                <Label :text="i" backgroundColor="red" />
            </v-template>

            <v-template if="i === 1">
                <Label :text="i" style="color: red;" backgroundColor="blue" />
            </v-template>

            <v-template if="i === 2">
                <Label :text="i" style="color: blue;" backgroundColor="green" />
            </v-template>

            <v-template if="i === 3">
                <Label :text="i" style="color: green;" backgroundColor="yellow" />
            </v-template>
          </Pager>
        </StackLayout>
      </Page>
    </Frame>
  `
}).$start()
