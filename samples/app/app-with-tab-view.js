const Vue = require('nativescript-vue')

Vue.config.debug = true

let app = new Vue({
  data: {
    activeTab: 1,
    tabs: [
      { title: 'First Tab', text: 'im the first tab' },
      { title: 'Second Tab', text: 'im the second tab' },
      { title: 'Third Tab', text: 'im the third tab' }
    ]
  },

  template: `
    <Frame>
      <Page>
        <ActionBar title="test">
          <StackLayout orientation="horizontal" horizontalAlignment="center">
            <Image src="res://icon" style="width: 30; height: 30; vertical-align: center; margin-right: 10;" />
            <Label style="font-size: 20; vertical-align: center;">
              <FormattedString>
                <Span text="Tab" fontWeight="Bold" />
                <Span text="Views" />
              </FormattedString>
            </Label>
          </StackLayout>
        </ActionBar>
        <StackLayout>
          <Label :text="activeTab" />
          <Button text="Click me!" @tap="tabs.push({title: 'added', text: 'added tab'})" />
          <button text="Go to last!" @tap="activeTab = tabs.length - 1" />

          <GridLayout>
            <TabView v-model="activeTab">
              <TabViewItem v-for="(tab, i) in tabs" :key="i + tab.title" :title="tab.title">
                <Label text="tab.text" />
              </TabViewItem>
            </TabView>
          </GridLayout>
        </StackLayout>
      </Page>
    </Frame>
  `
})

app.$start()
