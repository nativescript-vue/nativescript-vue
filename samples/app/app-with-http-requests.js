const Vue = require('nativescript-vue')
const http = require('http')

Vue.config.debug = true

new Vue({
  template: `
    <Frame>
      <Page>
        <ScrollView>
          <StackLayout>
            <Button text="make request" @tap="makeRequest" />
          </StackLayout>
        </ScrollView>
      </Page>
    </Frame>
  `,

  methods: {
    async makeRequest() {
      const res = await http.request({
        url: 'https://httpbin.org/anything',
        method: 'GET'
      })

      console.dir(res)
    }
  }
}).$start()
