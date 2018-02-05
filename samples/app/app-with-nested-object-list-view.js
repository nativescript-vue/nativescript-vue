const Vue = require('./nativescript-vue')

new Vue({
  template: `
    <Page>
      <ListView for="item in items">
        <v-template>
          <FlexboxLayout class="line">
            <Label :text="$index" />
            <Label :text="item.text" />
            <Label :text="item.user.name" />
            <Label :text="item.user.meta.age" />
          </FlexboxLayout>
        </v-template>
      </ListView>
    </Page>
  `,

  data: {
    items: [
      {
        text: 'text 1',
        user: { name: 'John', meta: { age: 10 } }
      },
      {
        text: 'text 2',
        user: { name: 'Lucy', meta: { age: 14 } }
      },
      {
        text: 'text 3',
        user: { name: 'Nick', meta: { age: 10 } }
      }
    ]
  }
}).$start()
