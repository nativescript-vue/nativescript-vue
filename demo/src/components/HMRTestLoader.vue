<template>
  <Frame>
    <Page>
      <Label text="Loading..." />
    </Page>
  </Frame>
</template>

<script setup lang="ts">
import { onMounted, $navigateTo } from 'nativescript-vue';
import HMRTest from './HMRTest.vue';

onMounted(() => {
  console.log('HMRTestLoader mounted');

  setTimeout(() => {
    console.log('Navigating to HMRTest');
    $navigateTo(HMRTest, {
      animated: false,
      clearHistory: true,
    });
  }, 100);
});
</script>
