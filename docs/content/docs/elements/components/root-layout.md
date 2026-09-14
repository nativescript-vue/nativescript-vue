---
contributors: [vallemar, rigor789]
---

# RootLayout

Layout container for dynamically layering views with a programmatic API.

`RootLayout` is documented in the [NativeScript docs](https://docs.nativescript.org/ui/root-layout). Its `open()` method expects a NativeScript view, so a Vue component has to be turned into one first with [`createNativeView`](/docs/utilities/nativescript-view).

1. Make `RootLayout` the root view of your app, or of the page, as shown in the [NativeScript examples](https://docs.nativescript.org/ui/root-layout#examples).
2. Render the component with `createNativeView`, mount it, and pass its `nativeView` to `open()`.

```vue
<script lang="ts" setup>
import { createNativeView } from 'nativescript-vue';
import { getRootLayout } from '@nativescript/core';
import MyComponent from './MyComponent.vue';

async function showRootLayout() {
  const view = createNativeView(MyComponent, {
    foo: 'bar',
    onChange(data) {
      // `emit('change', data)` inside MyComponent ends up here
    },
  });
  view.mount();

  const rootLayout = getRootLayout();

  await rootLayout.open(view.nativeView, {
    shadeCover: { color: '#000', opacity: 0.7, tapToClose: true },
    animation: {
      enterFrom: { opacity: 0, duration: 200 },
      exitTo: { opacity: 0, duration: 200 },
    },
  });
}
</script>

<template>
  <Button @tap="showRootLayout" text="Show RootLayout" />
</template>
```

`open()` resolves once the enter animation has finished. To dismiss the view later, close it through the same `RootLayout` and then unmount the component so its lifecycle hooks run:

```ts
await rootLayout.close(view.nativeView);
view.unmount();
```
