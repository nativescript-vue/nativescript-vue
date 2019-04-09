const Vue = require('nativescript-vue')

Vue.config.silent = false

new Vue({
  data: {
    items: [{ color: 'red' }, { color: 'blue' }]
  },
  template: `
    <Frame>
      <Page>
        <ActionBar title="Issue #229" />
        
        <GridLayout>
          <ListView for="item in items" class="list-group">
            <v-template>
              <Label :backgroundColor="item.color" :text="item.color" padding="50" />
            </v-template>    
          </ListView>
        </GridLayout>
      </Page>
    </Frame>
  `
}).$start()
