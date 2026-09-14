<script setup lang="ts">
import { ListItem, ref } from 'nativescript-vue';
import ListViewWrapper from './ListViewWrapper.vue';

interface Row {
  title: string;
  image?: string;
}

const rows: Row[] = Array(200)
  .fill(0)
  .map((_, i) => ({
    title: `Row ${i}`,
    image: i % 3 === 0 ? 'https://picsum.photos/seed/' + i + '/80' : undefined,
  }));

const selector = ({ item }: ListItem<Row>) =>
  item.image ? 'image' : 'no-image';

const useFallback = ref(false);
const rowsWithoutTemplates = rows.slice(0, 20);
</script>

<template>
  <Frame>
    <Page>
      <ActionBar title="ListView wrapper" />
      <GridLayout rows="auto, *">
        <Button
          :text="
            useFallback ? 'Show forwarded templates' : 'Show fallback template'
          "
          @tap="useFallback = !useFallback"
        />

        <ListViewWrapper
          v-if="!useFallback"
          row="1"
          :items="rows"
          :itemTemplateSelector="selector"
        >
          <template #image="{ item }: ListItem<Row>">
            <GridLayout columns="80, *" padding="8">
              <Image :src="item.image" width="80" height="80" />
              <Label
                col="1"
                :text="`${item.title} (image)`"
                verticalAlignment="middle"
                padding="8"
              />
            </GridLayout>
          </template>
          <template #no-image="{ item }: ListItem<Row>">
            <Label :text="`${item.title} (no image)`" padding="16" />
          </template>
        </ListViewWrapper>

        <ListViewWrapper v-else row="1" :items="rowsWithoutTemplates" />
      </GridLayout>
    </Page>
  </Frame>
</template>
