const Vue = require('./nativescript-vue')

Vue.config.debug = true
Vue.config.silent = false

new Vue({
  data: {
    selectedTab: 0
  },
  template: `
    <Frame>
      <Page>
        <ActionBar title="Issue #76">
            <SearchBar v-if="selectedTab === 0" />
            <Label v-else-if="selectedTab === 1" text="Second" />
            <Label v-else text="Third" />
        </ActionBar>
        <StackLayout>
          <TabView v-model="selectedTab">
            <TabViewItem title="First">
              <Label text="First"/>
            </TabViewItem>  
            <TabViewItem title="Second">
              <Label text="Second"/>
            </TabViewItem>  
            <TabViewItem title="Third">
              <Label text="Third"/>
            </TabViewItem>  
          </TabView>
        </StackLayout>
      </Page>
    </Frame>
  `,
  created() {
    console.log(Vue.compile(this.$options.template).render.toString())
  }
}).$start()
