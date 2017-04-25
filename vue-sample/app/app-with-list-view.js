const Vue = require('nativescript-vue/dist/index')

new Vue({
    data: {
        items: ['foo', 'bar', 'fizz', 'buzz'],
        items2: [
            {name: 'john'},
            {name: 'jane'},
            {name: 'jack'},
            {name: 'joe'},
        ]
    },

    template: `
        <page>
            <stack-layout>
                <label text="List 1 with primitive values" style="font-size: 30; text-align: center; margin: 30;"></label>
                
                <list-view :items="items">
                    <template scope="item">
                        <stack-layout>
                            <label :text="item.$index"></label>
                            <label :text="item.value"></label>
                        </stack-layout>
                    </template>
                </list-view>    
                
                <label text="List 2 with objects" style="font-size: 30; text-align: center; margin: 30;"></label>
                
                <list-view :items="items2">
                    <template scope="item">
                        <stack-layout orientation="horizontal" style="padding: 20">
                            <label :text="item.$index"></label>
                            <label :text="item.name" style="margin-left: 10"></label>
                        </stack-layout>
                    </template>
                </list-view>    
            </stack-layout>
        </page>
    `,
}).$start()