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
                <button @tap="addMore">Add more</button>
                <button @tap="remove">remove</button>
                <label :text="items.length" style="font-size: 30; text-align: center; margin: 30;"></label>
                
                <list-view :items="items">
                    <template scope="item">
                        <stack-layout orientation="horizontal" style="padding: 20">
                            <label :text="item.$index"></label>
                            <label :text="item.value" style="margin-left: 10"></label>
                        </stack-layout>
                    </template>
                </list-view>    
                
                <!--<label text="List 2 with objects" style="font-size: 30; text-align: center; margin: 30;"></label>-->
                
                <!--<list-view :items="items2">-->
                    <!--<template scope="item">-->
                        <!--<stack-layout orientation="horizontal" style="padding: 20">-->
                            <!--<label :text="item.$index"></label>-->
                            <!--<label :text="item.name" style="margin-left: 10"></label>-->
                        <!--</stack-layout>-->
                    <!--</template>-->
                <!--</list-view>    -->
            </stack-layout>
        </page>
    `,

    methods: {
        addMore() {
            this.items.push('added...' + Math.random())
        },
        remove() {
            this.items.splice(0, 1)
        }

    }
}).$start()