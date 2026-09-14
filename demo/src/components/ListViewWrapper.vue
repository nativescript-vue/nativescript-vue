<script setup lang="ts">
import type { ListItem } from 'nativescript-vue';

// Forwards every template it receives to the ListView and supplies a
// fallback default template, the Vue 2 "CVWrapper" pattern.
defineProps<{
  items: unknown[];
  itemTemplateSelector?: (ctx: ListItem) => string;
}>();
</script>

<template>
  <ListView :items="items" :itemTemplateSelector="itemTemplateSelector">
    <template v-for="(_, name) in $slots" :key="name" #[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>
    <template v-if="!$slots.default" #default="{ item }: ListItem">
      <GridLayout backgroundColor="#eee" padding="16">
        <Label :text="`fallback: ${JSON.stringify(item)}`" textWrap="true" />
      </GridLayout>
    </template>
  </ListView>
</template>
