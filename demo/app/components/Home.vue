<script setup lang="ts">
const message = "Hello World";

interface Test {
  name: string;
  foo: number;
  bool: boolean;
}

const items: Test[] = Array(10000)
  .fill(0)
  .map((_, i) => ({
    name: `Item ${i}`,
    foo: i,
    bool: true,
  }));


function selector() {
  return "default";
}
</script>

<template>
  <GridLayout rows="auto, *">
    <Label class="info" :text="message" />
    <!-- <ScrollView row="1">
      <StackLayout>
        <template v-for="i in 50">
          <Label :text="`Lorem ipsum dolor sit amet ${i}`" />
        </template>
      </StackLayout>
    </ScrollView> -->

    <ListView row="1" :items="items" :itemTemplateSelector="selector">
      <template #default="{ item, index, even, odd }: ListItem<Test>">
        <Label
          :text="`item: ${JSON.stringify(
            item
          )}\n\nindex: ${index} even: ${even} odd: ${odd}`"
          textWrap="true"
          padding="16"
        />
      </template>
      <!-- <v-template if="item.name === 'whatever'">
        <Label/>
      </v-template> -->
      <!-- <template #foo="{ item, index }">
        <Label :text="'FOO ' + item" />
      </template> -->
    </ListView>
  </GridLayout>
</template>
