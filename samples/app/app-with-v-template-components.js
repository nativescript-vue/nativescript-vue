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
    <page class="page">
      <action-bar title="Home" class="action-bar"></action-bar>
        <stack-layout class="home-panel">
          <list-view for="comment in comments">
            <v-template>
              <comment :comment="comment"/>
            </v-template>
          </list-view>
        </stack-layout>
    </page>
  `
}).$start()
