const Vue = require('nativescript-vue')
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
      modalResult: 'No result yet.',
      animated: true,
      fullscreen: true,
      stretched: false
    }
  },
  template: `
    <Frame>
      <Page>
        <ActionBar title="Modals" />

        <StackLayout>
          <FlexboxLayout justifyContent="center">
            <Label text="Animated" />
            <Switch v-model="animated" />
          </FlexboxLayout>
          <FlexboxLayout justifyContent="center">
            <Label text="Stretched" />
            <Switch v-model="stretched" />
          </FlexboxLayout>
          <FlexboxLayout justifyContent="center">
            <Label text="Fullscreen" />
            <Switch v-model="fullscreen" />
          </FlexboxLayout>
          <Button text="Open Modal" @tap="openModal"/>
          <Label :text="modalResult" />
        </StackLayout>
      </Page>
    </Frame>
  `,
  methods: {
    openModal() {
      this.$showModal(ModalComponent, {
        props: { foo: 'bar' },
        animated: this.animated,
        fullscreen: this.fullscreen,
        stretched: this.stretched
      }).then(res => {
        this.modalResult = res
      })
    }
  }
}).$start()
