<template>
    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!"/>
        <ScrollView>
            <StackLayout>
                <Button @tap="swap" text="Swap i and j"/>
                <StackLayout>
                    <template v-for="i in maxI">
                        <Label :text="`Item #${i}`" :key="`root-${i}`" class="item"/>
                        <Button v-for="j in maxJ" :key="`sub-${i}-${j}`" :text="`Sub Item #${i}-${j}`" class="sub-item" :class="{ 'even': j%2 === 0}"/>
                    </template>
                </StackLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
  export default {
    data() {
      return {
        maxI: 0,
        maxJ: 0
      }
    },
    mounted() {
      console.log('\n\n============CREATE============\n\n')
      this.maxI = 3
      this.maxJ = 2
    },
    methods: {
      swap() {
        console.log('\n\n============SWAP============\n\n')
        let currentI = this.maxI
        this.maxI = this.maxJ
        this.maxJ = currentI
      }
    }
  }
</script>

<style scoped>
    .item {
        padding: 16;
        color: crimson;
    }

    .sub-item {
        padding-left: 24;
    }

    .even {
        color: mediumseagreen;
    }
</style>
