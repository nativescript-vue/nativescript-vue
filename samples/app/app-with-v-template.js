const Vue = require('./nativescript-vue')

new Vue({
  data() {
    return {
      items: [
        'this',
        'is',
        'a',
        'list',
        'of',
        'random',
        'words',
        'to',
        'test',
        'the',
        'list',
        'view',
        'with',
        'multiple',
        'templates',
        'using',
        'the new',
        'v-template',
        'syntax',
        'pretty',
        'cool',
        'huh?'
      ]
    }
  },
  template: `
    <Page>
        <StackLayout>
            <list-view :items="items">
                <v-template>
                    <StackLayout style="padding: 50;">
                        <Label :text="item.value" style="color: blue;"/>
                    </StackLayout>
                </v-template>
                <v-template name="test" if="item.odd">
                    <StackLayout style="padding: 50;">
                        <Label :text="item.value" style="color: red;"/>
                    </StackLayout>
                </v-template>
            </list-view>
        </StackLayout>
    </Page>
  `
}).$start()
