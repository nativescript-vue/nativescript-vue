const Vue = require('nativescript-vue')

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
    <Frame>
      <Page>
        <GridLayout>
          <ListView for="line in items">
            <v-template>
              <StackLayout style="padding: 50;">
                <Label :text="line" class="even"/>
              </StackLayout>
            </v-template>

            <v-template if="line.length == 2">
              <StackLayout style="padding: 50;">
                <Label :text="line" style="color: green;"/>
              </StackLayout>
            </v-template>

            <v-template if="$odd">
              <StackLayout style="padding: 50;">
                <Label :text="line" class="odd"/>
              </StackLayout>
            </v-template>
          </ListView>
          </GridLayout>
      </Page>
    </Frame>
  `
}).$start()
