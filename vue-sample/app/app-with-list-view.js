const Vue = require('nativescript-vue/dist/index')

new Vue({
    data: {
        items: ['foo', 'bar', 'fizz', 'buzz'],
    },

    template: `
        <page>
            <stack-layout>
                <button @tap="addMore">Add more (+100000)</button>
                <button @tap="remove">remove</button>
                <label :text="items.length" style="text-align: center; font-size: 40;"></label>
                
                <list-view :items="items">
                    <template scope="item">
                        <stack-layout orientation="horizontal" style="padding: 20">
                            <label style="margin-left: 10; width: 100%; font-size: 20;" :text="item.$index"></label>
                        </stack-layout>
                    </template>
                </list-view>
            </stack-layout>
        </page>
    `,

    methods: {
        addMore() {
            let items = []
            for(let i = 0; i < 100000; ++i)
                this.items.push('added')
            this.items = this.items.concat(items)
        },
        remove() {
            this.items.splice(0, 1)
        }
    }
}).$start()