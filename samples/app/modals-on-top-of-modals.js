const Vue = require('nativescript-vue')
// const VueDevtools = require('nativescript-vue-devtools')

// Vue.use(VueDevtools)

Vue.config.debug = true
Vue.config.silent = false

const SecondaryModal = {
  name: 'SecondaryModalComponent',
  template: `
   <Frame>
    <Page>
        <ActionBar title="Secondary Modal ActionBar"/>
        <StackLayout>
            <Label text="I'm a modal that should appear above the other."/>
            <Button text="Close only this modal" @tap="$modal.close"/>
        </StackLayout>
    </Page>
</Frame>
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
            <Button text="Open another modal" @tap="openModal"/>
            <Button text="Close this modal" @tap="$modal.close"/>
        </StackLayout>
    </Page>
</Frame>
  `,

  methods: {
    openModal() {
      this.$showModal(SecondaryModal, { target: this })
    }
  }
}
new Vue({
  data() {
    return {
      modalResult: 'No result yet.',
      animated: true,
      fullscreen: false,
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
      })
    }
  }
}).$start()
