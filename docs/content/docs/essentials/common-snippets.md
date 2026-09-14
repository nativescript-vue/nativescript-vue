---
contributors: [rigor789]
---

# Common Snippets

Short, copy-pasteable recipes for the things that come up in almost every app.

## Rendering a list

For a handful of items that all fit on screen, a plain `v-for` inside a layout is enough — there is no native list involved, so every item is created up front.

```vue
<script setup>
import { ref } from 'nativescript-vue';

const tags = ref(['vue', 'nativescript', 'mobile']);
</script>

<template>
  <StackLayout class="p-4">
    <Label v-for="tag in tags" :key="tag" :text="tag" class="py-2 text-lg" />
  </StackLayout>
</template>
```

For long or unbounded lists use `<ListView>`, which only creates the cells that are visible and recycles them as you scroll. Because the same cell instance is reused for different items, keep all cell state derived from `item` rather than in a `ref` inside the template.

::: code-group

```vue [TypeScript]
<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import type { ListViewItemTapEvent } from 'nativescript-vue';

interface Item {
  id: number;
  title: string;
}

const items = ref<Item[]>([
  { id: 1, title: 'First' },
  { id: 2, title: 'Second' },
]);

function onItemTap(event: ListViewItemTapEvent<Item>) {
  console.log(event.item.title, event.index);
}
</script>

<template>
  <ListView :items="items" @itemTap="onItemTap">
    <template #default="{ item }">
      <StackLayout class="p-4">
        <Label :text="item.title" class="text-lg" />
      </StackLayout>
    </template>
  </ListView>
</template>
```

```vue [JavaScript]
<script setup>
import { ref } from 'nativescript-vue';

const items = ref([
  { id: 1, title: 'First' },
  { id: 2, title: 'Second' },
]);

function onItemTap(event) {
  console.log(event.item.title, event.index);
}
</script>

<template>
  <ListView :items="items" @itemTap="onItemTap">
    <template #default="{ item }">
      <StackLayout class="p-4">
        <Label :text="item.title" class="text-lg" />
      </StackLayout>
    </template>
  </ListView>
</template>
```

:::

See [ListView](/docs/elements/components/list-view) for multiple templates, template selectors and the full list of props and events.

## Sharing data between screens

To pass data forward, put it in the `props` option of `$navigateTo` and declare it with `defineProps` in the target.

```js
// Master.vue
$navigateTo(Detail, { props: { id: 14 } });
```

::: code-group

```vue [TypeScript]
// Detail.vue
<script lang="ts" setup>
const props = defineProps<{ id: number }>();
</script>

<template>
  <Page>
    <ActionBar title="Detail" />
    <StackLayout class="p-4">
      <Label :text="`Showing ${props.id}`" />
    </StackLayout>
  </Page>
</template>
```

```vue [JavaScript]
// Detail.vue
<script setup>
const props = defineProps({ id: Number });
</script>

<template>
  <Page>
    <ActionBar title="Detail" />
    <StackLayout class="p-4">
      <Label :text="`Showing ${props.id}`" />
    </StackLayout>
  </Page>
</template>
```

:::

To get data back, pass a handler along with the props. Keys starting with `on` are registered as listeners on the target component, so the target only has to emit.

```vue
// Master.vue
<script setup>
import { $navigateTo } from 'nativescript-vue';
import Edit from './Edit.vue';

function editItem(item) {
  $navigateTo(Edit, {
    props: {
      item,
      onSaved(updated) {
        console.log('saved', updated);
      },
    },
  });
}
</script>
```

```vue
// Edit.vue
<script setup>
import { $navigateBack } from 'nativescript-vue';

const props = defineProps(['item']);
const emit = defineEmits(['saved']);

function save() {
  emit('saved', { ...props.item, done: true });
  $navigateBack();
}
</script>
```

When the screen exists mainly to produce a value, a modal (below) is usually a better fit, and state that several unrelated screens need belongs in a store — see [Pinia](/docs/essentials/vue-plugins#pinia).

## Modals with results

`$showModal` returns a promise that resolves with whatever the modal was closed with. Inside the modal, close it with `$modal.close(value)` from the template, or import `$closeModal` in script.

```vue
// Master.vue
<script setup>
import { $showModal, ref } from 'nativescript-vue';
import PickColor from './PickColor.vue';

const color = ref('red');

async function pickColor() {
  const result = await $showModal(PickColor, {
    props: { initial: color.value },
  });
  if (result) {
    color.value = result;
  }
}
</script>
```

`result` is `undefined` when the modal is dismissed without a value — by the Android back button, an iOS swipe-down, or a bare `$modal.close()`.

```vue
// PickColor.vue
<script setup>
defineProps(['initial']);
</script>

<template>
  <Frame>
    <Page>
      <ActionBar title="Pick a color" />
      <StackLayout class="p-4">
        <Button text="Red" @tap="$modal.close('red')" />
        <Button text="Blue" @tap="$modal.close('blue')" />
        <Button v-if="$modal" text="Cancel" @tap="$modal.close()" />
      </StackLayout>
    </Page>
  </Frame>
</template>
```

`$modal` is `false` outside a modal, so `v-if="$modal"` lets a component that is used both as a page and as a modal render its close button only when it is shown modally.

On Android a modal is presented as a dialog by default; pass `fullscreen: true` to have it cover the screen. iOS modals are always fullscreen.

```js
$showModal(PickColor, { fullscreen: true });
```

## Going back to a specific page

`$navigateTo` returns the `Page` it created. Keep it, and pass it as `to` later to pop everything above it in a single navigation.

```vue
<script setup>
import { $navigateBack, $navigateTo } from 'nativescript-vue';
import Detail from './Detail.vue';

let detail;

function goToDetail() {
  detail = $navigateTo(Detail);
}

function backToDetail() {
  $navigateBack({ to: detail });
}
</script>
```

Requires 3.1.0 or newer. See [Manual Routing](/docs/essentials/routing#going-back-to-a-specific-page) for `BackstackEntry` targets and multi-frame navigation.

## Platform-specific UI

`<iOS>` and `<Android>` render their children only on that platform, which is the way to go when whole chunks of the tree differ.

```vue
<template>
  <StackLayout>
    <iOS>
      <Label text="Shown on iOS" />
    </iOS>
    <Android>
      <Label text="Shown on Android" />
    </Android>
  </StackLayout>
</template>
```

For single values, prefix the attribute with `ios:` or `android:` — the attribute is applied only on the matching platform and dropped on the other.

```vue
<template>
  <Label text="Hello" ios:color="blue" android:color="green" />
</template>
```

## Accessing the native view

Every component exposes the underlying NativeScript view as `.nativeView` on its template ref — see [Template Refs](/docs/essentials/template-refs). Event arguments carry it too, as `$event.object`, which is often the shortest path.

::: code-group

```vue [TypeScript]
<script lang="ts" setup>
import type { TextField } from '@nativescript/core';

function focusField(event: { object: TextField }) {
  event.object.focus();
}
</script>

<template>
  <TextField hint="Search" @loaded="focusField" />
</template>
```

```vue [JavaScript]
<script setup>
function focusField(event) {
  event.object.focus();
}
</script>

<template>
  <TextField hint="Search" @loaded="focusField" />
</template>
```

:::

Or, inline in the template:

```vue-html
<TextField hint="Search" @loaded="($event.object as TextField).focus()" />
```
