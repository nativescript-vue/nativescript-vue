---
contributors: [vallemar]
---

# Creating a NativeScript-Vue Application

A Nativescript-Vue application is initialized as we are used to doing in Vue, but with the difference that instead of calling `app.mount`, we will use `app.start`.

An example of a traditional application input file is the following.

```ts
import { createApp } from 'nativescript-vue'
// import the root component App from a single-file component.
import App from './App.vue'

const app = createApp(App);
app.start();
```

As we are used to, we can use `app.use` and everything that a Vue application can do with the `app` instance since this is a real Vue application and it is only bitamined with some methods like in this case `.start`.