---
contributors: [rigor789]
---

# TypeScript

The blank template is set up for TypeScript out of the box:

```shell
ns create myApp --template @nativescript-vue/template-blank@latest
```

TypeScript is not a requirement — see [Using JavaScript](#using-javascript) at the end of this page.

`nativescript-vue` ships its own type declarations, and it re-exports the whole Vue API (`ref`, `computed`, `watch`, `defineComponent`, the lifecycle hooks, ...) from `@vue/runtime-core`. Import them from `nativescript-vue`:

```ts
import { ref, computed, onMounted } from 'nativescript-vue';
```

## tsconfig

The parts of the template's `tsconfig.json` that matter for NativeScript-Vue:

```json
{
  "compilerOptions": {
    "lib": ["esnext", "WebWorker"],
    "paths": {
      "~/*": ["./src/*"],
      "@/*": ["./src/*"],
      "vue": ["./node_modules/nativescript-vue"]
    }
  },
  "vueCompilerOptions": {
    "target": 3,
    "lib": "nativescript-vue"
  },
  "include": ["src", "types"],
  "exclude": ["node_modules", "platforms"]
}
```

### `paths` — mapping `vue` to `nativescript-vue`

There is no `vue` package in a NativeScript-Vue project. Libraries such as Pinia or vue-i18n import from — and augment — the `vue` module, so without this mapping their types do not line up with the runtime the app actually uses: `app.use(pinia)` reports a type error, augmentations of `ComponentCustomProperties` never reach your components, and `import { ref } from 'vue'` fails to resolve. The webpack integration aliases `vue` to `nativescript-vue` at build time in the same way, so the types match what is bundled.

Prefer the mapping over installing `vue` itself. When a `vue` package is present, `vue-loader` compiles templates with that package's compiler, and the build warns when its version differs from the `@vue/runtime-core` version `nativescript-vue` runs on.

### `vueCompilerOptions`

Volar — `vue-tsc` and the Vue VS Code extension — generates its type-checking code from the `lib` package's `defineComponent`, which is why `lib` points at `nativescript-vue`. Setting `target: 3` explicitly avoids Volar trying to detect the Vue version from a `vue` package that isn't installed.

### `lib` without `dom`

NativeScript's runtime has no browser DOM, so the template uses `["esnext", "WebWorker"]`. Including `dom` would let code compile against APIs that do not exist at runtime.

### The `types` folder

`include` covers both `src` and `types`. The `types` folder holds two declaration files.

`types/references.d.ts` pulls in the native iOS and Android API typings from `@nativescript/types` (a devDependency):

```ts
/// <reference path="../node_modules/@nativescript/types/index.d.ts" />
```

`types/shims.vue.d.ts` declares the module type for `*.vue` imports:

```ts
declare module '*.vue' {
  import type { DefineComponent } from 'nativescript-vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```

### Existing projects

Add the `paths` entry and the `vueCompilerOptions` block to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "vue": ["./node_modules/nativescript-vue"]
    }
  },
  "vueCompilerOptions": {
    "lib": "nativescript-vue"
  }
}
```

## Typing components

Props and emits work exactly as in Vue, using the type-only forms of `defineProps` and `defineEmits`:

```vue
<script setup lang="ts">
const props = defineProps<{ id: number }>();
const emit = defineEmits<{ saved: [item: Item] }>();
</script>
```

Template refs resolve to a wrapper — the native view lives on `.nativeView`, which you cast to the matching class from `@nativescript/core` (see [Template Refs](/docs/essentials/template-refs)):

```vue
<script setup lang="ts">
import { useTemplateRef, onMounted } from 'nativescript-vue';
import { type Label } from '@nativescript/core';

const label = useTemplateRef('my-label');

onMounted(() => {
  const labelView = label.value.nativeView as Label;
  labelView.text = 'Text changed';
});
</script>

<template>
  <Label ref="my-label" text="Hello" />
</template>
```

The same cast applies to event handlers, where `$event.object` is the native view that raised the event:

```vue
<script setup lang="ts">
import type { EventData, TextField } from '@nativescript/core';

function onTextChange(event: EventData) {
  console.log((event.object as TextField).text);
}
</script>

<template>
  <TextField @textChange="onTextChange" />
</template>
```

`ListView` ships two helper types — `ListItem<T>` for the slot scope and `ListViewItemTapEvent<T>` for `@itemTap` handlers (see [ListView](/docs/elements/components/list-view)):

```vue
<script setup lang="ts">
import type { ListItem, ListViewItemTapEvent } from 'nativescript-vue';

function onItemTap(event: ListViewItemTapEvent<Item>) {
  console.log(event.item.name, event.index);
}
</script>

<template>
  <ListView :items="items" @itemTap="onItemTap">
    <template #default="{ item }: ListItem<Item>">
      <Label :text="item.name" />
    </template>
  </ListView>
</template>
```

## Type checking

For a full check of both `.ts` files and `.vue` templates, add `vue-tsc` as a devDependency and run:

```shell
npx vue-tsc --noEmit
```

During `ns run`, the webpack build reports TypeScript errors for `.ts` files through fork-ts-checker, but it does not type-check `.vue` templates — the NativeScript-Vue webpack integration disables the checker's Vue mode. Rely on `vue-tsc` or your editor for template errors.

In VS Code, install the [Vue (official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension.

## Using JavaScript

Everything on this page is optional — NativeScript-Vue works without TypeScript:

- Rename `src/app.ts` to `src/app.js` and point `main` in `package.json` (or in `nativescript.config`) at it.
- Use `<script setup>` without `lang="ts"`.
- Don't install `typescript`. The webpack integration only enables the TypeScript checker when the project depends on `typescript`; JavaScript-only projects were fixed to build without it in 3.1.0.
