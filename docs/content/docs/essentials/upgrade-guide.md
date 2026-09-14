---
contributors: [vallemar, rigor789]
---

# Upgrade Guide

## Upgrading from v2 to v3

NativeScript-Vue 3 is built on Vue 3. Besides the [Vue 3 migration](https://v3-migration.vuejs.org/) itself, these are the NativeScript-Vue specific changes.

### Application initialization

In NativeScript-Vue 2 the app was started from a `Vue` instance:

```ts
import Vue from 'nativescript-vue';
import Home from './components/Home.vue';

new Vue({
  render: (h) => h('frame', [h(Home)]),
}).$start();
```

In 3 you use `createApp`:

```ts
import { createApp } from 'nativescript-vue';
import Home from './components/Home.vue';

createApp(Home).start();
```

✅ **Key changes:**

- `createApp(Home).start()` replaces `new Vue({ ... }).$start()`.
- The root `<Frame>` now lives in the root component's template, not in a render function. See the template's [`Home.vue`](https://github.com/nativescript-vue/nativescript-vue/blob/main/packages/template-blank/src/components/Home.vue#L33).

### Navigation

`$navigateTo`, `$navigateBack`, `$showModal` and `$closeModal` are exported from `nativescript-vue` for use in `<script setup>`:

```vue
<script lang="ts" setup>
import { $navigateTo, $navigateBack, $showModal } from 'nativescript-vue';
import MyComponent from './components/MyComponent.vue';

function navigate() {
  $navigateTo(MyComponent, {/* options */});
}

function goBack() {
  $navigateBack();
}

function openModal() {
  $showModal(MyComponent, {/* options */});
}
</script>
```

They are still available on `this` in the Options API, and as `$navigateTo(...)` directly in templates. See [Routing](/docs/essentials/routing) for the full API — `$navigateBack` now takes an options object, and `$showModal` returns a promise resolving with the modal's result.

### Plugin registration

`registerElement` is an import instead of a static method on `Vue`.

**Before (v2)**

```ts
import Vue from 'nativescript-vue';

Vue.registerElement('PDFView', () => require('@nativescript/pdf').PDFView);
```

**Now (v3)**

```ts
import { createApp, registerElement } from 'nativescript-vue';
import Home from './components/Home.vue';

registerElement('PDFView', () => require('@nativescript/pdf').PDFView);

createApp(Home).start();
```

Plugins that ship a Vue 3 plugin are installed with `app.use()` instead. See [NativeScript plugins](/docs/essentials/nativescript-plugins) for both forms.

### ListView

1. `for="item in listOfItems"` becomes `:items="listOfItems"`.
1. `<v-template if="...">` becomes a named slot picked by `:itemTemplateSelector`.
1. The slot scope is destructured with `#default="{ item, index }"`.

**Before (v2)**

```vue-html
<ListView for="item in items">
  <v-template>
    <Label :text="item.text" />
  </v-template>

  <v-template if="$odd">
    <Label :text="item.text" class="bg-red-500" />
  </v-template>
</ListView>
```

**Now (v3)**

```vue
<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import type { ListItem } from 'nativescript-vue';

const items = ref([/* ... items ... */]);

function itemTemplateSelector({ odd }: ListItem) {
  return odd ? 'odd' : 'default';
}
</script>

<template>
  <ListView :items="items" :itemTemplateSelector="itemTemplateSelector">
    <template #default="{ item }">
      <Label :text="item.text" />
    </template>

    <template #odd="{ item }">
      <Label :text="item.text" class="bg-red-500" />
    </template>
  </ListView>
</template>
```

`itemTemplateSelector` receives the same `{ item, index, even, odd }` object the slots do, and returns the name of the slot to use.

🚀 **Bonus:** the slot scope can be typed with the `ListItem` helper:

```vue-html
<template #default="{ item, index }: ListItem<MyType>"></template>
```

See [ListView](/docs/elements/components/list-view) for the full API.

### Other differences

- `$modal` is `false` outside a modal, so `v-if="$modal"` distinguishes a component shown as a page from one shown modally.
- `<Android>` and `<iOS>` are available again since 3.1.
- Template refs expose the native view as `.nativeView`, see [Template Refs](/docs/essentials/template-refs).
- The [Gotchas](/docs/essentials/gotchas#coming-from-nativescript-vue-2) page lists the remaining mental-model changes.
