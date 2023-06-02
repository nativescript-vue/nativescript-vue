<!-- https://github.com/nativescript-vue/nativescript-vue/issues/1017 -->
<script lang="ts" setup>
import { Label, GridLayout, ContentView } from '@nativescript/core';

import demo_ListView from './demo_ListView.vue';
import FragmentRootComponent from './FragmentRootComponent.vue';
</script>

<template>
  <GridLayout rows="auto, auto, *">
    <Label text="Hello World" />

    <StackLayout row="1">
      <FragmentRootComponent />
    </StackLayout>

    <ContentView row="2">
      <demo_ListView />
    </ContentView>
  </GridLayout>
</template>
