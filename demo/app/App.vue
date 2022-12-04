<script setup lang="ts">
import { ref } from "vue";
import { goHome } from "./composables/goHome";
import { useFPS } from "./composables/useFPS";

const navigate = () => {
  goHome();
};

const { fps } = useFPS();

const something = "SOMETHING";
const somethingElse = "SOMETHING_ELSE";
const whatever = "WHATEVER";

const data = ref([{ name: "foo" }, { name: "bar" }, { name: "baz" }]);

const blink = ref(true);

setInterval(() => {
  blink.value = !blink.value;
}, 1000);

</script>

<template>
  <Frame>
    <Page>
      <StackLayout>
        <Button text="Navigate" @tap="navigate" />
        <Label
          :text="fps"
          color="green"
          fontFamily="monospace"
          textAlignment="right"
          fontSize="32"
          fontWeight="bold"
        />
        <Label>{{ blink }}</Label>
        <Label :text="blink" />
        <Label v-for="(item, i) in data" textWrap>
          #{{ i }}: {{ item.name }} This is
          {{ blink ? something : somethingElse }} and
          {{ blink ? somethingElse : "" }} with a bit of
          {{ blink && whatever }} sprinkled in. And ofc some {{ fps }}...
        </Label>
      </StackLayout>
    </Page>
  </Frame>
</template>
