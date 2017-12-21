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
            <list-view for="line in items">
                <v-template>
                    <StackLayout style="padding: 50;">
                        <Label :text="line" style="color: blue;"/>
                    </StackLayout>
                </v-template>
                <v-template if="line.value.length == 2">
                    <StackLayout style="padding: 50;">
                        <Label :text="line" style="color: green;"/>
                    </StackLayout>
                </v-template>
                <v-template if="line.odd">
                    <StackLayout style="padding: 50;">
                        <Label :text="line" style="color: red;"/>
                    </StackLayout>
                </v-template>
            </list-view>
        </StackLayout>
    </Page>
  `
}).$start()
