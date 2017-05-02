const Vue = require('nativescript-vue/dist/index')

let app = new Vue({
    data: {
        selectedTab: 0,
        tabs: [
            {title: 'First Tab', text: 'im the first tab'},
            {title: 'Second Tab', text: 'im the second tab'},
            {title: 'Third Tab', text: 'im the third tab'},
        ]
    },

    template: `
        <page>
            <stack-layout>
                <button @tap="tabs.push({title: 'added', text: 'added tab'})">Click me!</button>
                <tab-view :selectedIndex="selectedTab">
                    <tab-view-item  v-for="(tab, i) in tabs" key="i" :title="tab.title">
                        <label>{{ tab.text }}</label>
                    </tab-view-item>
                </tab-view>
            </stack-layout>
        </page>
    `,
})

app.$start()