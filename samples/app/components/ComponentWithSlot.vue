<template>
  <StackLayout :color="counter < 5 ? 'red' : 'blue'">
    <slot :counter="counter"/>
    <Button text="+1" @tap="counter++"/>
  </StackLayout>
</template>

<script>
export default {
  data() {
    return {
      counter: 0
    }
  },
}
</script>
