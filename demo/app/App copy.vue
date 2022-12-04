<script setup lang="ts">
import { ref } from "vue";
import { goHome } from "./composables/goHome";

import { useTimeAgo } from "@vueuse/core";

const navigate = () => {
  goHome();
};

const timeAgo = useTimeAgo(new Date(), {
  showSecond: true,
  updateInterval: 1000,
});

// const items = computed(() => {
//   return ["a", "b", "c", "d", "e", "f", "g", "h"];
// });
const items: string[] = Array(1000)
  .fill(0)
  .map((_, i) => `Item ${i}`);

const selector = (item: ListItem) => {
  return item.even ? "default" : "odd";
};

const ts = ref(new Date().getTime());
const visible = ref(false);

setInterval(() => {
  ts.value = new Date().getTime();
  visible.value = !visible.value;
}, 500);
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
            <Label
              :text="`Item: ${aliased} Time: ${ts}\n\n${timeAgo}`"
              textWrap="true"
              padding="16"
            />
          </template>
          <template #odd="{ item }: ListItem<string>">
            <GridLayout rows="auto, 50">
              <Label
                :text="`ODD: ${item} Time: ${ts}!!`"
                padding="16"
                backgroundColor="rgba(255, 0, 0, 0.2)"
              />

              <Button row="1" v-show="visible">Tap me if you can!</Button>
              <Button row="1" v-show="!visible">You missed it</Button>
            </GridLayout>
          </template>
        </ListView>
      </GridLayout>
    </Page>
  </Frame>
</template>
