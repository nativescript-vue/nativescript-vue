<!-- https://github.com/nativescript-vue/nativescript-vue/issues/1010 -->
<script lang="ts" setup>
import { ref } from "vue";

const tapCount = ref(0);

function onTap() {
  tapCount.value++;
  console.trace("Tapped!", tapCount.value);
}

function onLoaded(args) {
  console.log("STACK LOADED")
}
</script>

<template>
  <StackLayout @loaded="onLoaded" @LOADED="onLoaded" @lOaD="onLoaded">
    <Label>Tap count: {{ tapCount }}</Label>
    <Button @tap="(tapCount = 0)">Reset</Button>

    <!-- correct: fires only once -->
    <Button @tap="onTap">Tap: Button</Button>

    <!-- incorrect: fires twice! -->
    <Label @tap="onTap">Tap: Label</Label>
  </StackLayout>
</template>

