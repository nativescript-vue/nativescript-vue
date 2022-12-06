<script setup lang="ts">
import { ObservableArray } from "@nativescript/core";
import { useDebounceFn } from "@vueuse/shared";
import { ref } from "vue";
import { goHome } from "../composables/goHome";
import { useFPS } from "../composables/useFPS";

const navigate = () => {
  goHome();
};

interface Item {
  title: string;
  text: string;
  date: Date;
}

function getDate(offset: number = 0) {
  const ts = new Date().getTime();
  return new Date(ts - offset * 1000);
}

// const items: Item[] = Array(10000)
//   .fill(0)
//   .map((_, i) => {
//     return {
//       title: `Item ${i}`,
//       text: "Lorem ipsum dolor sit amet...",
//       date: getDate(i),
//     };
//   });

const { fps } = useFPS();

const count = ref(0);
const items2 = ref(
  new ObservableArray(
    Array(1000)
      .fill(0)
      .map((_, i) => {
        return {
          name: `Item ${i}`,
        };
      })
  )
);
const name = ref("Vue 3");

const selected = ref<any[]>([]);

function onTap() {
  console.log("tapped", count.value);
  count.value++;
}

const show = ref(false);

// setInterval(() => {
//   show.value = !show.value;
// }, 10);

setInterval(() => {
  count.value++;
}, 10);

// setInterval(() => {
//   items2.value.push({ name: name.value });
// }, 100);

const onItemTap = useDebounceFn((item) => {
  console.log("ITEM TAP", item);
  if (selected.value.includes(item)) {
    selected.value.splice(selected.value.indexOf(item), 1);
  } else {
    selected.value.push(item);
  }
}, 10);
</script>

<template>
  <Frame>
    <Page>
      <GridLayout rows="auto, auto, *">
        <Button text="Navigate" @tap="navigate" />
        <Label
          rew="1"
          :text="fps"
          color="green"
          fontFamily="monospace"
          textAlignment="right"
          fontSize="32"
          fontWeight="bold"
        />
        <StackLayout row="2">
          <Label>Hello: {{ name }}</Label>
          <Button
            @tap="onTap"
            padding="16"
            backgroundColor="#65adf1"
            :text="`Tap me`"
          ></Button>

          <GridLayout height="60" columns="*, *">
            <Button col="0" @tap="items2.push({ name: name + items2.length })"
              >Add item!</Button
            >
            <Button col="1" @tap="items2.pop()">Remove item!</Button>
          </GridLayout>

          <Label>Selected: {{ selected.length }}</Label>

          <ListView :items="items2" height="800">
            <template #default="{ item, index }: ListItem<{ name: string }>">
              <StackLayout
                @tap="onItemTap(item)"
                :backgroundColor="selected.includes(item) ? '#ffedd5' : ''"
                padding="16"
              >
                <Progress :value="(index + count) % 100" />
                <Label
                  :text="`Current name: ${name}, current count: ${count}`"
                />
                <Label :text="`Odd: Index: ${index}, name: ${item.name}`" />
                <Label
                  :text="item.name"
                  color="#16a34a"
                  textAlignment="right"
                />
                <Button
                  @tap="items2.splice(index, 1)"
                  horizontalAlignment="right"
                  backgroundColor="#fee2e2"
                  color="#7f1d1d"
                  borderRadius="8"
                  marginTop="8"
                  padding="8"
                  >Remove</Button
                >
              </StackLayout>
            </template>
          </ListView>
        </StackLayout>
        <!-- <ListView row="2" :items="items">
          <template #default="{ item, even }: ListItem<Item>">
            <GridLayout rows="auto, auto, auto" padding="16">
              <Label
                :text="item.title"
                fontSize="18"
                fontWeight="bold"
                :color="even ? 'red' : 'blue'"
              />
              <Label :text="item.text" marginTop="8" row="1" />
              <UseTimeAgo v-slot="{ timeAgo }" :time="item.date">
                <Label :text="timeAgo" color="#65adf1" marginTop="12" row="2" />
              </UseTimeAgo>
            </GridLayout>
          </template>
        </ListView> -->
      </GridLayout>
    </Page>
  </Frame>
</template>
