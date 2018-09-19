const Vue = require('./nativescript-vue')
const VueDevtools = require('nativescript-vue-devtools')

Vue.use(VueDevtools)

Vue.config.debug = true
Vue.config.silent = false

const FooComp = {
  template: `
      <Button @tap="$modal.close('passed data')" text="Close me"/>
  `
}

const ModalComponent = {
  props: ['foo'],
  name: 'ModalComponent',
  template: `
   <Frame>
    <Page>
        <ActionBar title="Modal ActionBar"/>
        <StackLayout>
            <Label text="I'm a modal."/>
            <Label :text="foo"/>
            <FooComp></FooComp>
        </StackLayout>
    </Page> 
</Frame>
  `,
  components: { FooComp }
}

new Vue({
  data() {
    return {
      modalResult: 'No result yet.'
    }
  },
  template: `
    <Frame>
      <Page>
        <ActionBar title="Modals" />

        <StackLayout>
            <Label :text="modalResult" />
            <Button text="Open Modal" @tap="openModal"/>
        </StackLayout>
      </Page>
    </Frame>
  `,
  methods: {
    openModal() {
      this.$showModal(ModalComponent, {
        props: { foo: 'bar' },
        fullscreen: true
      }).then(res => {
        this.modalResult = res
      })
    }
  }
}).$start()
