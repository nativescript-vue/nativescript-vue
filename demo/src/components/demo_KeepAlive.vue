<script setup lang="ts">
import {
  defineComponent,
  h,
  onActivated,
  onDeactivated,
  ref,
} from 'nativescript-vue';

function counter(name: string) {
  return defineComponent({
    name,
    setup() {
      const count = ref(0);
      onActivated(() => console.log(`${name} activated`));
      onDeactivated(() => console.log(`${name} deactivated`));
      return () =>
        h('StackLayout', [
          h('Label', { text: `${name}: tapped ${count.value} times` }),
          h('Button', { text: `Tap ${name}`, onTap: () => count.value++ }),
        ]);
    },
  });
}

const tabs = { A: counter('A'), B: counter('B') };
const active = ref<keyof typeof tabs>('A');
</script>

<template>
  <Frame>
    <Page>
      <ActionBar title="KeepAlive" />
      <StackLayout>
        <Button text="Show A" @tap="active = 'A'" />
        <Button text="Show B" @tap="active = 'B'" />
        <KeepAlive>
          <component :is="tabs[active]" />
        </KeepAlive>
        <Label text="Tap counts survive switching tabs" />
      </StackLayout>
    </Page>
  </Frame>
</template>
