<script setup lang="ts">
import type { View } from '@nativescript/core';
import { shallowRef } from 'nativescript-vue';
import {
  closeWindow,
  destroySceneSession,
  openWindow,
  recreateActivity,
} from './harness';

const isIOS = __APPLE__;
const view = shallowRef<View>();
</script>

<template>
  <StackLayout @loaded="view = $event.object">
    <Button text="Open new window" @tap="openWindow" />
    <Button
      v-if="isIOS"
      text="Destroy this window's scene session"
      @tap="destroySceneSession(view)"
    />
    <Button v-else text="Recreate activity" @tap="recreateActivity(view)" />
    <Button text="Close window" @tap="closeWindow(view)" />
  </StackLayout>
</template>
