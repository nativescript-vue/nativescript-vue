const Vue = require('nativescript-vue/dist/index')
new Vue({
    data: {
        test: 'testing',
        test2: 50
    },

    template: `
        <page>
            <stack-layout>
                <button @tap="onTap">whatever</button>
                <text-field v-model="test"></text-field>
                <slider v-model.number="test2"></slider>
                
                <label>{{ test }}</label>
                <label>{{ test2 }}</label>
            </stack-layout>
        </page>
    `,

    methods: {
        onTap() {
            this.test = 'changed'
            this.test2 = '42'
        }
    }
}).$start()