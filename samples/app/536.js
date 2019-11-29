import Vue from 'nativescript-vue'

Vue.config.debug = true
Vue.config.silent = false

const Step2 = {
  template: `
    <Page>
      <ActionBar title="Step 2" />

      <GridLayout rows="*, auto, auto">
        <Label text="This is the second step of the wizard." row="0" />

        <Button text="Previous" @tap="prevStep" row="1" />
      </GridLayout>
    </Page>
  `,
  methods: {
    prevStep() {
      this.$navigateBack({
        frame: 'wizard'
      })
    }
  }
}

const WizardModal = {
  template: `
    <Frame id="wizard">
      <Page>
        <ActionBar title="Step 1" />
        <GridLayout rows="*, auto">
          <Label text="This is the first step of the wizard." row="0" />
          <Button text="Next" @tap="nextStep" row="1" />
        </GridLayout>
      </Page>
    </Frame>
  `,
  methods: {
    nextStep() {
      this.$navigateTo(Step2, {
        frame: 'wizard'
      })
    }
  }
}

const TabContent = {
  template: `
  <GridLayout rows="auto, auto">
      <Label text="This is the home page." row="0" />
      <Button text="Open Wizard" row="1" @tap="openWizard" />
  </GridLayout>
  `,
  methods: {
    openWizard() {
      // show the wizard in a modal, and make sure it is fullscreen.
      this.$showModal(WizardModal, {
        fullscreen: true
      }).then(res => {
        console.log('wizard completed with res', res)
      })
    }
  }
}

new Vue({
  components: {
    TabContent
  },
  template: `
  <GridLayout rows="*">
    <TabView androidTabsPosition="bottom" iosIconRenderingMode="alwaysOriginal">
      <TabViewItem title="Tab1" textTransform="capitalize">
        <Frame id="main-frame">
          <Page class="page">
            <ActionBar title="#536" />
            <TabContent />
          </Page>
        </Frame>
      </TabViewItem>
    </TabView>
  </GridLayout>
  `
}).$start()
