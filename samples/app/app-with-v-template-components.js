const Vue = require('./nativescript-vue')

Vue.component('comment', {
  props: ['comment'],
  template: `<label :text="comment.content"/>`
})

new Vue({
  data: {
    comments: [
      { content: 'hello1' },
      { content: 'hello2' },
      { content: 'hello3' },
      { content: 'hello4' }
    ]
  },
  template: `
    <Page class="page">
      <ActionBar title="Home" class="action-bar" />
        <StackLayout class="home-panel">
          <ListView for="comment in comments">
            <v-template>
              <Comment :comment="comment" />
            </v-template>
          </ListView>
        </StackLayout>
    </Page>
  `
}).$start()
