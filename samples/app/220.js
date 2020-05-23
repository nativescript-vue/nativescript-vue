const Vue = require('nativescript-vue')

Vue.config.debug = true
Vue.config.silent = false

const CompButton = {
  template: `
      <Button :text="\`\${label}: \${counter}\`" />
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
      <StackLayout>
          <Button @tap="inc" :text="counter" />
          <keep-alive>
              <CompButton v-if="counter % 2 === 0" key="odd" label="Odd" :counter="counter"/>
              <CompButton v-else key="even" label="Even" :counter="counter"/>
          </keep-alive>
      </StackLayout>
  `,
  created() {
    console.log(Vue.compile(this.$options.template).render.toString())
  },
  methods: {
    inc() {
      console.log('\n\n=========INC=========\n\n')
      this.counter++
    }
  },
  components: {
    CompButton
  }
}).$start()
