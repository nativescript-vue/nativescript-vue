<script setup lang="ts">
import { ListItem, onMounted, onUnmounted } from 'nativescript-vue';
import { goHome } from '../composables/goHome';
import Test from './Test.vue';
import { $closeModal } from 'nativescript-vue';

withDefaults(
  defineProps<{
    depth?: number;
    title?: string;
    items?: (string | number)[];
    enabled?: boolean;
  }>(),
  { depth: 0 },
);

const message = 'Hello World!!';

interface Test {
  name: string;
  foo: number;
  bool: boolean;
}

const items: Test[] = Array(1000)
  .fill(0)
  .map((_, i) => ({ name: `Item ${i}`, foo: i, bool: true }));

function selector(item: ListItem<Test>) {
  return item.even ? 'default' : 'odd';
}

onMounted(() => {
  console.log('MOUNTED HOME');
});

onUnmounted(() => {
  console.log('UNMOUNTED HOME');
});

function close() {
  $closeModal('closed via $closeModal');
}
</script>

<template>
  <Page>
    <ActionBar :title="`Depth: ${depth}`"></ActionBar>
    <StackLayout>
      <Label class="info" :text="message + ' ' + depth" />
      <Button text="Go home" @tap="goHome(depth + 1)" />
      <Button text="Go home Modal" @tap="goHome(depth + 1, true)" />
      <Button
        text="Close Modal"
        @tap="$modal?.close({ depth, foo: 'bar' }, 'arg1', 'arg2')"
      />
      <Button text="Close Modal (via $closeModal)" @tap="close" />

      <Test />

      <template v-if="depth > 2">
        <Label text="Hello?" />
      </template>

      <ListView height="500" :items="items" :itemTemplateSelector="selector">
        <template #default="{ item, index, even, odd }: ListItem<Test>">
          <Label
            :text="`item: ${JSON.stringify(
              item,
            )}\n\nindex: ${index} even: ${even} odd: ${odd}`"
            textWrap="true"
            padding="16"
            @tap="$emit('customEvent', { item, index, even, odd })"
          />
        </template>

        <template #odd="{ item, index, even, odd }: ListItem<Test>">
          <Label
            backgroundColor="red"
            :text="`item: ${JSON.stringify(
              item,
            )}\n\nindex: ${index} even: ${even} odd: ${odd}`"
            textWrap="true"
            padding="16"
            @tap="$emit('customEvent', { item, index, even, odd })"
          />
        </template>
      </ListView>
    </StackLayout>
  </Page>
</template>

<style scoped>
.info {
  text-align: center;
  font-weight: 500;
  margin-top: 12;
}
</style>
