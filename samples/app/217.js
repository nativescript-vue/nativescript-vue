const Vue = require('nativescript-vue')

Vue.config.debug = true
Vue.config.silent = false

const CustomComponent = {
  // defining props breaks this on iOS
  // props: ['text'],
  template: `<Button @tap="$emit('tap')"/>`
}

const PageContent = {
  data() {
    return {
      normal: false,
      custom: false
    }
  },
  template: `
    <StackLayout>
      <Label :text="normal" textWrap="true" />
      <Label :text="custom" textWrap="true" />
      <Button :text="'Normal Button: ' + normal " @tap="normal = !normal"/>
      <CustomComponent :text="'Custom Button: ' + custom" @tap="custom = !custom"/>
    </StackLayout>
  `,
  components: {
    CustomComponent
  }
}

new Vue({
  data: {
    content: PageContent
  },
  template: `
    <Frame>
      <Page>
        <ActionBar title="Issue #217"/>
        <component :is="content" />
      </Page>
    </Frame>
  `
}).$start()
