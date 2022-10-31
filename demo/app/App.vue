<script setup lang="ts">
import { computed, ref } from "vue";
import { goHome } from "./composables/goHome";

import { useTimeAgo } from "@vueuse/core";

const navigate = () => {
  goHome();
};

const timeAgo = useTimeAgo(new Date());

// const items = computed(() => {
//   return ["a", "b", "c", "d", "e", "f", "g", "h"];
// });
const items: string[] = Array(1000)
  .fill(0)
  .map((_, i) => `Item ${i}`);

const ts = ref(new Date().getTime());
setInterval(() => {
  ts.value = new Date().getTime();
}, 500);

const selector = (item: ListItem) => {
  return item.even ? "default" : "odd";
};
</script>

<template>
  <Frame>
    <Page>
      <GridLayout rows="auto, auto, auto, *">
        <Button text="Navigate" @tap="navigate" />

        <Label :text="timeAgo" row="1" />
        <Label :text="ts" row="2" />

        <ListView row="3" :items="items" :itemTemplateSelector="selector">
          <template #default="{ item: aliased }: ListItem<string>">
            <Label :text="`Item: ${aliased} Time: ${ts}`" padding="16" />
          </template>
          <template #odd="{ item: aliased }: ListItem<string>">
            <Label
              :text="`ODD: ${aliased} Time: ${ts}!!`"
              padding="16"
              backgroundColor="rgba(255, 0, 0, 0.2)"
            />
          </template>
        </ListView>
      </GridLayout>
    </Page>
  </Frame>
</template>
