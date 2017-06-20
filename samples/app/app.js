const Vue = require('nativescript-vue/dist/index')

Vue.component('image-viewer', {
    props: ['imgSrc'],

    data() {
        return {
            img: ''
        }
    },

    template: `
        <stack-layout>
            <image style="height: 200;" :src="img"></image>
            <scroll-view orientation="horizontal" style="height: 100">
                <stack-layout orientation="horizontal">
                    <image v-for="i in 10" key="i" 
                    :src="i%2 ? '~/images/apple.jpg' : '~/images/vue.png'" 
                    @tap="img = i%2 ? '~/images/apple.jpg' : '~/images/vue.png'"></image>
                </stack-layout>
            </scroll-view>
        </stack-layout>
    `,

    mounted() {
        this.img = this.imgSrc
    }
})

new Vue({
    template: `
        <page>
            <scroll-view>
                <stack-layout>
                    <button @tap="onTap">TAP HERE</button>
                    <button @tap="textRed = !textRed" style="color: white; background-color: darkcyan;">TAP HERE</button>
                    <label :style="{color: textRed ? 'red' : 'blue'}"
                            style="text-align: center; margin-top: 20; font-size: 40"
                            :text="showTrick ? 'Poof!' : 'Wait for it!'"></label>
                    <button @tap="showTrick = !showTrick">Tap to see a trick!</button>
                    
                    <image-viewer v-if="showTrick" :imgSrc="imgSrc"></image-viewer>
                </stack-layout>
            </scroll-view>
        </page>
    `,

    data: {
        textRed: false,
        showTrick: false,
        imgSrc: '~/images/apple.jpg'
    },

    methods: {
        onTap() {
            alert('Nice Tap!')
        }
    }
}).$start()