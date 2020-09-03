import Vue from 'nativescript-vue'
import { ObservableArray } from '@nativescript/core'

Vue.config.debug = true
Vue.config.silent = false

new Vue({
  data: {
    itemsArray: [1, 2, 3],
    itemsObservableArray: new ObservableArray([1, 2, 3])
  },
  template: `
    <Frame>
      <Page>
        <ActionBar title="#522" />
        <GridLayout rows="*, *">
          <ListView for="item in itemsArray" row="0">
            <v-template>
              <Label :text="item"/>
            </v-template>
          </ListView>
          <ListView for="item in itemsObservableArray" row="1">
            <v-template>
              <Label :text="item" color="red"/>
            </v-template>
          </ListView>
        </GridLayout>

      </Page>
    </Frame>`
}).$start()
