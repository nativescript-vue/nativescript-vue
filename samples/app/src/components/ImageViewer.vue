<template>
    <stack-layout>
        <image style="height: 200;" :src="img"></image>
        <scroll-view orientation="horizontal" style="height: 100">
            <stack-layout orientation="horizontal">
                <image v-for="i in 10" key="i"
                       :src="i%2 ? '~/assets/images/apple.jpg' : '~/assets/images/vue.png'"
                       @tap="img = i%2 ? '~/assets/images/apple.jpg' : '~/assets/images/vue.png'"></image>
            </stack-layout>
        </scroll-view>
    </stack-layout>
</template>
<script type="text/javascript">
    export default {
        name: 'image-viewer',
        props: ['imgSrc'],

        data() {
            return {
                img: ''
            }
        },


        mounted() {
            this.img = this.imgSrc
        }
    }
</script>