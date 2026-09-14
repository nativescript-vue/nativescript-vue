---
contributors: [vallemar]
---

# Template Refs

To access the elements or views of the template in Vue we have [`template refs`](https://vuejs.org/guide/essentials/template-refs#template-refs) available.

In NativeScript-Vue it is exactly the same as Vue but with one change to take into account, to access the native view we must access `.nativeView` of the reactive reference. Example.

```vue
<script lang="ts" setup>
import { ref, onMounted } from "nativescript-vue"
import { type Label } from "@nativescript/core"

const el = ref();

onMounted(() => {
  const labelView = el.value.nativeView as Label;
  labelView.text= "Text changed";
})
</script>

<template>
  <Label ref="el" text="Template Refs" />
</template>
```

## Using `useTemplateRef`

In nativescript-vue we can also use [`useTemplateRef​`](https://vuejs.org/guide/essentials/template-refs#accessing-the-refs) just like in vue, to access the native view access the `.nativeView` property of the reactive value.


```vue
<script setup>
import { useTemplateRef, onMounted } from "nativescript-vue"
import { type Label } from "@nativescript/core"

// the first argument must match the ref value in the template
const label = useTemplateRef('my-label');

onMounted(() => {
  const labelView = label.value.nativeView as Label;
  labelView.text= "Text changed";
})
</script>

<template>
  <Label ref="my-label" text="Template Refs" />
</template>
```