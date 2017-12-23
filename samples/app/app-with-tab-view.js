const Vue = require('./nativescript-vue')
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
        <page>
            <action-bar title="test">
              <stack-layout orientation="horizontal" horizontalAlignment="center">
                <image src="res://icon" style="width: 30; height: 30; vertical-align: center; margin-right: 10;"/>
                <Label style="font-size: 20; vertical-align: center;">
                  <FormattedString>
                    <Span text="Tab" fontWeight="Bold"></Span>
                    <Span text="Views"></Span>
                  </FormattedString>
                </Label>
              </stack-layout>
            </action-bar>
            <stack-layout>
                <Label :text="activeTab"/>
                <button @tap="tabs.push({title: 'added', text: 'added tab'})">Click me!</button>
                <button @tap="activeTab = tabs.length - 1">Go to last!</button>
                <tab-view v-model="activeTab">
                    <tab-view-item v-for="(tab, i) in tabs" :key="i + tab.title" :title="tab.title">
                        <label>{{ tab.text }}</label>
                    </tab-view-item>
                </tab-view>
            </stack-layout>
        </page>
    `
})

app.$start()
