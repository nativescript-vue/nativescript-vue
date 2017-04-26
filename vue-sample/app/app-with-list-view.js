const Vue = require('nativescript-vue/dist/index')
const http = require("http");
Vue.prototype.$http = http

new Vue({
    data: {
        items: [],
    },

    template: `
        <page>
            <stack-layout>
                <list-view :items="items">
                    <template scope="item">
                        <grid-layout rows="80" columns="80, *">
                            <image :src="item.image" row="0" col="0" style="padding: 20;"></image>
                            <label :text="item.title" row="0" col="1" style="padding: 20; font-size: 18"></label>
                        </grid-layout>
                    </template>
                </list-view>
            </stack-layout>
        </page>
    `,

    created() {
        this.$http.getJSON('https://www.reddit.com/r/funny.json').then((res) => {
            this.items = res.data.children.map((item) => {
                return {
                    title: item.data.title,
                    image: item.data.thumbnail
                }
            })
        }).catch((err) => {
            console.log('err..' + err)
        })
    },

    methods: {}
}).$start()