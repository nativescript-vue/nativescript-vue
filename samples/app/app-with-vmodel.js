const Vue = require('./nativescript-vue')

new Vue({
  data: {
    test: 'testing',
    test2: 50,
    test3: 30
  },

  template: `
    <Page>
      <StackLayout>
        <Button text="whatever" @tap="onTap" />
        <TextField v-model="test" />
        <Slider v-model.number="test2" />
        <Slider v-model.number="test3" minValue="-10" maxValue="50" style="margin-top: 15;" />

        <Label text="test" />
        <Label text="test2" />
        <Label text="test3" />
      </StackLayout>
    </Page>
  `,

  methods: {
    onTap() {
      this.test = 'changed'
      this.test2 = 42
    }
  }
}).$start()
