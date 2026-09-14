---
contributors: [vallemar, rigor789]
---

# Creating a NativeScript-Vue Application

A NativeScript-Vue application is created the same way as a Vue web application, with one difference: instead of mounting the app onto a DOM element with `app.mount`, you start it with `app.start`.

The entry file of the blank template, `src/app.ts`, is as small as this:

```ts
import { createApp } from 'nativescript-vue';
import Home from './components/Home.vue';

createApp(Home).start();
```

`createApp` returns a real Vue application instance, so everything you would do with one on the web — `app.use(plugin)`, `app.component(...)`, `app.provide(...)`, `app.config.globalProperties` — works here as well. `start()` is the NativeScript-specific addition: it renders the root component and hands its native view to NativeScript's `Application.run()`.

The root component is expected to render a `<Frame>` with a `<Page>` inside, which is what enables [navigation](/docs/essentials/routing). The template's `Home.vue` does exactly that:

```vue
<template>
  <Frame>
    <Page>
      <ActionBar title="Home" />
      <StackLayout>
        <Label text="Hello, NativeScript-Vue!" />
      </StackLayout>
    </Page>
  </Frame>
</template>
```
