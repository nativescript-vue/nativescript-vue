const Vue = require('./nativescript-vue')

Vue.config.silent = false
Vue.config.debug = true

new Vue({
  data() {
    return {
      a: true
    }
  },
  template: `
    <GridLayout rows="*, *">
      <Frame row="0">
        <Page v-if="a">
          <StackLayout>
            <Label text="Hello Frame"/>
            <Button text="go to other Frame" @tap="a = false"/>
          </StackLayout>
        </Page>
        <Page v-else>
          <StackLayout>
            <Label text="Hello other frame"/>
            <Button text="go to prev Frame" @tap="a = true"/>
          </StackLayout>
        </Page>
      </Frame>
      <Frame row="1">
        <Page v-if="!a" actionBarHidden="true">
          <StackLayout>
            <Label text="Hello Frame"/>
            <Button text="go to other Frame" @tap="a = true"/>
          </StackLayout>
        </Page>
        <Page v-else actionBarHidden="true">
          <StackLayout>
            <Label text="Hello other frame"/>
            <Button text="go to prev Frame" @tap="a = false"/>
          </StackLayout>
        </Page>
      </Frame>
    </GridLayout>
  `
}).$start()
