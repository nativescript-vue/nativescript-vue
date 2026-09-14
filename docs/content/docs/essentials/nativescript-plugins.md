---
contributors: [rigor789, vallemar]
---

# Using NativeScript Plugins

Plugins work as in [any other NativeScript app](https://docs.nativescript.org/plugins/). Non-UI plugins — camera, geolocation, secure storage and the like — need nothing extra: install them and import them. Plugins that provide a _view_ have to be registered as an element before they can be used in a `<template>`.

## Registering a view with `registerElement`

`registerElement(name, resolver, meta?)` maps a tag name to a NativeScript view class. The resolver is a function returning the class, so the plugin is only loaded when the element is first rendered.

Take the [`@nativescript/pdf`](https://github.com/NativeScript/plugins/tree/main/packages/pdf) plugin, whose `PDFView` class renders a PDF:

```shell
npm install @nativescript/pdf
```

Register it in the app entry file (`src/app.ts` in the blank template) before `createApp(...).start()`:

```ts
import { createApp, registerElement } from 'nativescript-vue';
import Home from './components/Home.vue';

registerElement('PDFView', () => require('@nativescript/pdf').PDFView);

createApp(Home).start();
```

Then use it in any template, binding props and listening to events as with any other view:

```vue-html
<PDFView src="https://example.com/file.pdf" @load="onLoad" />
```

The tag name is up to you, and lookups are case-insensitive, so `<PDFView>` and `<pdf-view>` resolve to the same element. Registering a name twice throws unless the meta sets `overwriteExisting: true`.

::: tip
If a freshly installed plugin does not work, its native dependencies were probably not picked up by a stale build. Remove the `platforms` folder and run the app again.
:::

### Supporting `v-model`

`v-model` only works on elements that declare which prop and event form the model. Pass the pair in the `meta` argument:

```ts
registerElement('Rating', () => require('some-rating-plugin').Rating, {
  model: { prop: 'value', event: 'valueChange' },
});
```

See [Gotchas](/docs/essentials/gotchas#v-model-only-works-on-elements-that-declare-a-model-pair) for the elements that support `v-model` out of the box.

## Plugins that ship a Vue plugin

Some plugins, in particular those from [nativescript-community](https://github.com/nativescript-community), export a Vue plugin that registers their elements for you. Those are installed with `app.use()` instead of `registerElement`:

```ts
import { createApp } from 'nativescript-vue';
import CollectionView from '@nativescript-community/ui-collectionview/vue3';
import Home from './components/Home.vue';

createApp(Home).use(CollectionView).start();
```

Check the plugin's documentation for a `vue3` (or `vue`) entry point. When there is none, `registerElement` works for any plugin that exposes a view class.
