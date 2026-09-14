---
contributors: [vallemar]
---

# RootLayout

Layout container for dynamically layering views with a programmatic API.

The official documentation for `RootLayout` is [here](https://docs.nativescript.org/ui/root-layout), but in NativeScript-Vue it will not work with Vue components since `RootLayout` expects a NativeScript view and a Vue component is a node and not a NativeScript view.

This documentation explains how to create a NativeScript view from a Vue component in [Nativescript View](/docs/utilities/nativescript-view), but this section presents a typical case for use with `RootLayout`.

1. Add the `RootLayout` view to your application. [Reference](https://docs.nativescript.org/ui/root-layout#examples).
2. Create NativeScript view from a Vue component using `createNativeView` and `open` RootLayout.

```vue
<script lang="ts" setup>
import { createNativeView } from "nativescript-vue"
import { getRootLayout } from "@nativescript/core"
import MyComponent from "./MyComponent.vue"

function showRootLayout(){
  const node = createNativeView(MyComponent, {
    props: {
      foo: "bar",
      onChange(data){
        // can listen to events launched via `emit`. In this example: `emit("change")`
      }
    }
  })
  node.mount();
  
  getRootLayout()
    .open(node.nativeView, {
      animation: {...},
      ...
    });
}

</script>

<template>
  <Button @tap="showRootLayout" text="Show RootLayout" />
</template>
```
