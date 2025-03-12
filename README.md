<p align="center">
  <img src="https://user-images.githubusercontent.com/879060/205505950-70769439-ff3e-4ecc-b0cd-1385483a847c.jpg">
  <i>Yes, the image needs to be updated :)</i>
</p>

<h1 align="center">NativeScript-Vue3</h1>

<p align="center">
    <a href="https://www.npmjs.com/package/nativescript-vue">
       <img src="https://img.shields.io/npm/v/nativescript-vue/latest.svg" alt="npm"/>
    </a>
    <a href="https://github.com/nativescript-vue/nativescript-vue/blob/master/LICENSE">
       <img src="https://img.shields.io/github/license/nativescript-vue/nativescript-vue.svg" alt="license"/>
    </a>
</p>

NativeScript-Vue now supports Vue 3 and is generally available! This version brings improved reactivity, a modern plugin system, and better TypeScript support.

## Quick Start

To get started, you can use the [StackBlitz Template](https://stackblitz.com/fork/github/nativescript-vue/nativescript-vue/tree/main/packages/stackblitz-template?file=src%2Fcomponents%2FHome.vue&title=NativeScript%20Starter%20Vue3%20Beta).

Or, set up locally:

```sh
ns create myAwesomeApp --template @nativescript-vue/template-blank@latest

cd myAwesomeApp
ns run ios|android
```

## Upgrading from v2 to v3

<details>

<summary>Expand upgrade instructions</summary>

### Application Initialization Changes

In Vue 2, the app was initialized like this:

```ts
import Vue from 'nativescript-vue';
import Home from './components/Home.vue';

new Vue({
  render: (h) => h('frame', [h(Home)]),
}).$start();
```

In Vue 3, you now use `createApp`:

```ts
import { createApp } from 'nativescript-vue';
import Home from './components/Home.vue';

const app = createApp(Home);
app.start();
```

✅ **Key Changes:**

- Use `createApp(Home)` instead of `new Vue()`.
- The root `<Frame>` component should now be inside `Home.vue` (depending on your frame/navigation setup), not in the `createApp` function.

[Example Implementation](https://github.com/nativescript-vue/nativescript-vue/blob/main/packages/template-blank/src/components/Home.vue#L33)

### Navigation Changes in Vue 3

Navigation functions like `$navigateTo`, `$navigateBack`, and `$showModal` must now be **imported** instead of being accessed from `this`.

```html
<script lang="ts" setup>
  import { $navigateTo, $navigateBack, $showModal } from 'nativescript-vue';
  import MyComponent from './components/MyComponent.vue';

  function navigate() {
    $navigateTo(MyComponent, {
      /* options */
    });
  }

  function goBack() {
    $navigateBack();
  }

  function openModal() {
    $showModal(MyComponent, {
      /* options */
    });
  }
</script>
```

> ✅ **Why the change?**
>
> Vue 3 now uses **composition API** and removes `$navigateTo` from the component instance.

> **Note** Vue3 also supports the options API, where these methods are still available on `this`, however we recommend using the composition API.

### Plugin Registration

Plugins are now registered using `registerElement` instead of modifying the Vue instance.

#### **Before (Vue 2)**

```ts
import Vue from 'nativescript-vue';

Vue.registerElement(
  'Gradient',
  () => require('nativescript-gradient').Gradient,
);
```

#### **Now (Vue 3)**

```ts
import { createApp, registerElement } from 'nativescript-vue';
import Home from './components/Home.vue';

registerElement('Gradient', () => require('nativescript-gradient').Gradient);

// or using import statements
import { Gradient } from 'nativescript-gradient';
registerElement('Gradient', () => Gradient);

const app = createApp(Home);
app.start();
```

> ✅ **Note** Some plugins export a Vue3 compatible plugin, that can be used with `.use()`, like `@nativescript-community/ui-collectionview/vue3`. Consult the plugin documentation and if it doesn't specify this, use `registerElement` normally.

```ts
import { createApp } from 'nativescript-vue';
import Home from './components/Home.vue';
import CollectionView from '@nativescript-community/ui-collectionview/vue3';

const app = createApp(Home);
app.use(CollectionView);
app.start();
```

### ListView Changes

1. Instead of `for="item in listOfItems"`, use `:items="items"`
1. Instead of `if="condition"` us `:itemTemplateSelector="function"`
1. Use `#default="{ item, index }"` inside `<template>`

**Before (Vue 2)**

```html
<ListView for="item in listOfItems">
  <v-template>
    <label :text="item.text" />
  </v-template>

  <v-template if="item.odd">
    <label :text="item.text" class="bg-red-500" />
  </v-template>
</ListView>
```

**Now (Vue 3)**

```html
<script lang="ts" setup>
  const items = ref([
    /* ... items... */
  ]);

  function itemTemplateSelector(item, index) {
    return index % 2 === 0 ? 'default' : 'odd';
  }
</script>

<template>
  <ListView :items="items" :itemTemplateSelector="itemTemplateSelector">
    <template #default="{ item, index }">
      <label :text="item.text" />
    </template>

    <template #odd="{ item, index }">
      <label :text="item.text" class="bg-red-500" />
    </template>
  </ListView>
</template>
```

🚀 **Bonus:** You can now strongly type `item` using TypeScript!

```html
<template
  #default="{ item, index }: { item: MyType, index: number }"
></template>
```

Or, using the `ListItem` helper type:

```html
<template #default="{ item, index }: ListItem<MyType>"></template>
```

</details>

## Using Vue Devtools

To enable Vue Devtools, run:

```sh
ns run ios|android --env.vueDevtools
```

🛠️ **Android Users:**
To allow Vue Devtools to connect, enable **cleartext HTTP traffic** in your `AndroidManifest.xml`:

```diff
<application ...
+  android:usesCleartextTraffic="true"
.../>
```

## Issues

If you encounter any issues, please open a new issue with as much detail as possible.

- [Join Discord](https://nativescript.org/discord)

## Looking for V2?

The V2 version has been moved to the [v2 branch](https://github.com/nativescript-vue/nativescript-vue/tree/v2)
