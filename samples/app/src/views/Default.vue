<template>
          <scroll-view>
            <stack-layout>
                <button class="btn-primary" @tap="onTap">TAP HERE</button>
                <button @tap="textRed = !textRed" style="color: white; background-color: darkcyan;">TAP HERE</button>
                <label :style="{color: textRed ? 'red' : 'blue'}"
                style="text-align: center; margin-top: 20; font-size: 40"
                :text="showTrick ? 'Poof!' : 'Wait for it!'"></label>
                <button @tap="showTrick = !showTrick">Tap to see a trick!</button>

                <image-viewer v-if="showTrick" :imgSrc="imgSrc"></image-viewer>
            </stack-layout>
        </scroll-view>
</template>
<script type="text/javascript">
    export default{
        data (){

            return{
                textRed: false,
                showTrick: false,
                imgSrc: '~/assets/images/apple.jpg'
            }
        },

        methods: {
            onTap() {
                alert('Nice Tap!')
            },
        }
    }
</script>
<style type="text/css">
    .btn-primary{background: blue}
</style>
