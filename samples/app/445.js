const Vue = require('./nativescript-vue')

Vue.config.debug = true
Vue.config.silent = false

new Vue({
  components: {
    ComponentWithSlot: {
      data() {
        return {
          counter: 0
        }
      },
      template: `
        <StackLayout :color="counter < 5 ? 'red' : 'blue'">
            <slot :counter="counter"/>
            
            <Button text="+1" @tap="counter++"/>
        </StackLayout>
      `
    }
  },
  template: `
    <Frame>
      <Page>
        <ActionBar title="Vue 2.6 - v-slot #445" />

        <ComponentWithSlot>
          <template v-slot="scope">
            <Label :text="scope.counter" />
          </template>
        </ComponentWithSlot>
      </Page>
    </Frame>
  `
}).$start()
