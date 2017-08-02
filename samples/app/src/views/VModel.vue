<template>  
    <stack-layout>
        <button @tap="onTap">whatever</button>
        <text-field v-model="test"></text-field>
        <slider v-model.number="test2"></slider>
        <slider v-model.number="test3" minValue="-10" maxValue="50" style="margin-top: 15;"></slider>
        
        <label>{{ test }}</label>
        <label>{{ test2 }}</label>
        <label>{{ test3 }}</label>
    </stack-layout>
</template>

<script>
    export default {
        data() {
            return {
                test: 'testing',
                test2: 50,
                test3: 30
            }
        },

        created(){
           this.$on = (...args) => {
              this.debug = args
            };
        },
        methods: {
            onTap() {
                this.test = 'changed'
                this.test2 = 42
            }
        }
    }
</script>