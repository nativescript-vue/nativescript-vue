---
contributors: [jlooper, ikoevska]
---

# Using Vue Plugins

This page provides an overview of the currently supported Vue plugins that work with NativeScript-Vue.

- [Vue Router](#vue-router)
- [Pinia](#pinia)

## Vue Router

> Currently, integration with Vue Router is **unsupported**. Until the team resolves the issue, please use [routing](/docs/essentials/routing).

## Pinia

Pinia is a state management pattern and library. It serves as a store for all the components in an app and implements rules to ensure that state is mutated in a predictable fashion.

### Install the plugin

Install Pinia as you would normally in your Vue.js app. With npm, for example:

```shell
npm install --save pinia
```

The most recent version of Pinia will be added to your `package.json`.

### Import the plugin

Open your app entry file (likely `app.js`, `main.js` or `app.ts`) and add the following line at the top:

```ts
import {createPinia} from "pinia";
const pinia = createPinia();
createApp(Main).use(pinia).start();
```

Now you can use Pinia to manage the state of your mobile app, similar to how you would use it in a standard Vue web app.

### Usage: Create a store

You need to create a new constant to store your state and invoke Pinia API calls. You can do that in the app entry file after the creation of the Vue instance or in a separate folder (for example, `/store`).

In the following example, a simple store constant includes the state of a counter and tracks its changes:

```ts
import { defineStore } from "pinia";
export const counterStore = defineStore('counter', {
 state: () => ({
  count: 0,
 }),
 actions: {
  increment() {
   this.count++;
  },
  decrement() {
   this.count--;
  }
 }
});
```

### Usage: Use the store

Now you can manage state by calling the store you just created. In the following example, the app tracks the count value as you press a '+' or '-' button. Note that you don't manipulate the state itself, but call actions to increment and decrement its value.

```Vue
<script lang="ts" setup>
import { computed } from 'nativescript-vue';
import { counterStore } from '~/store/counter';
import { StackLayout } from '@nativescript/core';

const store = counterStore();

const count = computed(() => store.count);

</script>

<template>
  <Page>
    <ScrollView>
      <StackLayout>
        <Button @tap="store.increment()" text="+" />
        <Button @tap="store.decrement()" text="-" />
        <Label :text="count" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>
```

For more information about Pinia, see [the Pinia documentation](https://pinia.vuejs.org/).

### HMR Support

For HMR support please take a look at this article from [Vladyslav Piskunov](https://twitter.com/vladyslav_p) [Implementing Hot Module Reload (HMR) for Pinia in NativeScript-Vue with Webpack 5](https://medium.com/@vladyslav_uk/implementing-hot-module-reload-hmr-for-pinia-in-nativescript-vue-with-webpack-5-1754604ff00f)
<!--
For more examples about how to manage the elements of Vuex, explore the [`/store` folder](https://github.com/tralves/groceries-ns-vue/tree/master/app/store/) of the NativeScript-Vue Groceries sample.
-->