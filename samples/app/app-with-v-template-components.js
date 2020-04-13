const Vue = require('nativescript-vue')

Vue.config.silent = false
Vue.config.debug = true

// Comment is a built-in tag/component so we use CommentComp instead
// the framework should warn about this in the future!
Vue.component('CommentComp', {
  props: ['comment'],
  template: `<Label :text="comment.content"/>`,
})

new Vue({
  data: {
    comments: [
      { content: 'hello1' },
      { content: 'hello2' },
      { content: 'hello3' },
      { content: 'hello4' },
    ],
  },
  template: `
    <Frame>
      <Page class="page">
        <ActionBar title="Home" class="action-bar" />
          <GridLayout class="home-panel">
            <ListView for="comment in comments">
              <v-template>
                <CommentComp :comment="comment" />
              </v-template>
            </ListView>
          </GridLayout>
      </Page>
    </Frame>
  `,
}).$start()
