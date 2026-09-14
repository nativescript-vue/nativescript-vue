---
contributors: [vallemar]
---

# Template Refs

To access the elements or views of the template in Vue we have [`template refs`](https://vuejs.org/guide/essentials/template-refs#template-refs) available.

In NativeScript-Vue they work exactly as in Vue, with one difference: the ref points at a wrapper, and the NativeScript view is on its `.nativeView` property.

```vue
<script lang="ts" setup>
import { ref, onMounted } from 'nativescript-vue';
import { type Label } from '@nativescript/core';

const el = ref();

onMounted(() => {
  const labelView = el.value.nativeView as Label;
  labelView.text = 'Text changed';
});
</script>

<template>
  <Label ref="el" text="Template Refs" />
</template>
```

## Using `useTemplateRef`

[`useTemplateRef`](https://vuejs.org/guide/essentials/template-refs#accessing-the-refs) works the same way. The native view is again on the `.nativeView` property of the value.

```vue
<script lang="ts" setup>
import { useTemplateRef, onMounted } from 'nativescript-vue';
import { type Label } from '@nativescript/core';

// the argument must match the `ref` attribute in the template
const label = useTemplateRef('my-label');

onMounted(() => {
  const labelView = label.value.nativeView as Label;
  labelView.text = 'Text changed';
});
</script>

<template>
  <Label ref="my-label" text="Template Refs" />
</template>
```

::: tip
`onMounted` runs when the component tree is created, before the native view is on screen. For work that needs the view laid out — measuring, focusing a field — use the view's `@loaded` event or the page's `@navigatedTo` instead. See [Gotchas](/docs/essentials/gotchas#onmounted-is-not-on-screen).
:::
