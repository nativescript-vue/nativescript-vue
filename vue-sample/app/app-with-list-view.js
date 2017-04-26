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
                <button @tap="shuffle">shuffle</button>
                <label :text="JSON.stringify(items)"></label>
                
                <list-view :items="items" :templateSelector="templateSelector">
                    <template scope="item">
                        <stack-layout orientation="horizontal" style="padding: 20">
                            <label style="margin-left: 10; width: 100%; font-size: 20;" :text="item.$index"></label>
                        </stack-layout>
                    </template>
                    <template name="alt" scope="item">
                        <label style="padding: 20; text-align: right; font-size: 20; background-color: darkcyan;" :text="item.$index"></label>
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
            for(let i = 0; i < 20000; ++i)
                this.items.push('added...' + Math.random())
        },
        shuffle() {
            console.log('shuffle')
            this.items.push(this.items.shift())
        },
        remove() {
            this.items.splice(0, 1)
        },
        templateSelector(item) {
            return item.even ? "default" : "alt"
        }
    }
}).$start()