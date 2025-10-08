<template>
  <Page>
    <StackLayout>
      <Label
        text="nativescript-vue/demo"
        fontSize="32"
        fontWeight="bold"
        padding="20"
        color="#4CAF50"
      />
      <Label
        text="Hello World from HMRTest - nativescript-vue Demo"
        fontSize="24"
        padding="20"
      />
      <Label
        text="Edit this text to test HMR in Demo"
        fontSize="16"
        padding="20"
      />
    </StackLayout>
  </Page>
</template>

<script setup lang="ts">
import { onMounted } from 'nativescript-vue';

onMounted(() => {
  console.log('HMRTest component mounted - Demo');
});
</script>
