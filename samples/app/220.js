const Vue = require('./nativescript-vue')

Vue.config.debug = true
Vue.config.silent = false

const CompButton = {
  template: `
    <Button @tap="counter++">{{label}}: {{counter}}</Button>
    `,
  name: 'CompButton',
  props: ['label'],
  data() {
    return {
      counter: 0
    }
  }
}

new Vue({
  data: {
    counter: 0
  },
  template: `
    <Frame>
      <Page>
        <ActionBar title="Issue #127" />
        
        <StackLayout>
          <Button @tap="counter++">{{counter}}</Button>
          
          <keep-alive>
            <CompButton v-if="counter % 2" key="odd" label="Odd"></CompButton>
            <CompButton v-else key="even" label="Even"></CompButton>
          </keep-alive>
        </StackLayout>
      </Page>
    </Frame>
  `,
  created() {
    console.log(Vue.compile(this.$options.template).render.toString())
  },
  components: {
    CompButton
  }
}).$start()
