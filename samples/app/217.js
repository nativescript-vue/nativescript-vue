const Vue = require('./nativescript-vue')

Vue.config.debug = true
Vue.config.silent = false

const CustomComponent = {
  template: `
    <Button :text="text" @tap="$emit('tap')"/>
  `,
  name: 'CustomComponent',
  props: ['text']
}

new Vue({
  data() {
    return {
      normal: false,
      custom: false
    }
  },
  template: `
    <Frame>
      <Page>
        <ActionBar title="Issue #217"/>
        <StackLayout>
          <Button :text="'Normal Button: ' + normal " @tap="normal = !normal"/>
          <CustomComponent :text="'Custom Button: ' + custom" @tap="custom = !custom"/>
        </StackLayout>
      </Page>
    </Frame>
  `,
  components: {
    CustomComponent
  }
}).$start()
