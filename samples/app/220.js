const Vue = require('nativescript-vue')

Vue.config.debug = true
Vue.config.silent = false

const CompButton = {
  template: `
    <Button>{{label}}: {{counter}}</Button>
  `,
  name: 'CompButton',
  props: ['label', 'counter'],
  destroyed() {
    console.log('Component destroyed. This should not happen')
  }
}

new Vue({
  data: {
    counter: 0
  },
  template: `
    <Frame>
      <Page>
        <ActionBar title="Issue #220" />
        <StackLayout>
          <Button @tap="counter++">{{counter}}</Button>
          <keep-alive>
            <CompButton v-if="counter % 2" key="odd" label="Odd" :counter="counter" />
            <CompButton v-else key="even" label="Even" :counter="counter" />
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
