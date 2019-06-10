const Vue = require('nativescript-vue')

Vue.config.silent = false

new Vue({
  data: {
    password: 'mypass'
  },
  template: `
    <Frame>
      <Page>
        <ActionBar title="Issue #171" />

        <StackLayout class="m-t-20">
          <Label text="The following two fields should look the same" />
          <TextField v-model="password" secure />
          <TextField v-model="password" :secure="true" />
          <Label text="The following two fields should look the same" />
          <TextField v-model="password" secure="false" />
          <TextField v-model="password" :secure="false" />
        </StackLayout>
    </Page>
    </Frame>
  `
}).$start()
