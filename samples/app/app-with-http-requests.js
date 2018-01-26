const Vue = require('./nativescript-vue')
Vue.config.debug = true
const http = require('http')

new Vue({
  template: `
    <Page>
      <ScrollView>
        <StackLayout>
          <Button text="make request" @tap="makeRequest"/>
        </StackLayout>
      </ScrollView>    
    </Page>    
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
