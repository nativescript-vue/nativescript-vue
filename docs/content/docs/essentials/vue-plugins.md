---
contributors: [jlooper, ikoevska, rigor789]
---

# Using Vue Plugins

Vue plugins are installed with `app.use()` exactly as on the web, because `createApp` returns a real Vue application instance. Anything that only depends on the Vue runtime — state management, i18n, composables, validation — works unchanged. Plugins that assume a browser DOM, or that own the view tree the way vue-router does, do not.

- [Vue Router](#vue-router)
- [Pinia](#pinia)
- [VueUse](#vueuse)

## Vue Router

> Vue Router is not supported: navigation is owned by the native `Frame`, see [why not vue-router?](/docs/essentials/routing#why-not-vue-router). Use [routing](/docs/essentials/routing) instead.

## Pinia

Pinia is the recommended store for Vue 3, and works as-is.

### Install the plugin

```shell
npm install pinia
```

### Register the plugin

In the app entry file, `src/app.ts`:

```ts
import { createApp } from 'nativescript-vue';
import { createPinia } from 'pinia';
import Home from './components/Home.vue';

createApp(Home).use(createPinia()).start();
```

### Create a store

Define stores as usual, for example in `src/stores/counter.ts`:

```ts
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
});
```

### Use the store

```vue
<script lang="ts" setup>
import { useCounterStore } from '~/stores/counter';

const counter = useCounterStore();
</script>

<template>
  <Page>
    <StackLayout>
      <Button @tap="counter.increment()" text="+" />
      <Button @tap="counter.decrement()" text="-" />
      <Label :text="counter.count" />
    </StackLayout>
  </Page>
</template>
```

For more information about Pinia, see [the Pinia documentation](https://pinia.vuejs.org/).

::: tip TypeScript
Pinia augments the `vue` module with its types. The blank template maps `vue` to `nativescript-vue` in `tsconfig.json` so those augmentations line up — see [TypeScript](/docs/essentials/typescript#paths-mapping-vue-to-nativescript-vue) if you are adding Pinia to an older project.
:::

## VueUse

[VueUse](https://vueuse.org/) composables that only use Vue's reactivity — `useDebounceFn`, `useIntervalFn`, `useAsyncState`, `createSharedComposable` and many more — work without changes. Composables built on browser-only APIs — `useLocalStorage`, `useMediaQuery`, `useEventListener` on `window`, anything touching `document` — do not, since there is no DOM. Use the NativeScript equivalents from `@nativescript/core` for those.
