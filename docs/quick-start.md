---
title: Quick Start
---

## Using `nativescript-vue-template`

1) Create a NativeScript app using `nativescript-vue-template`

```sh
tns create MyApp --template nativescript-vue-template
```

2) Run the app on Android or iOS:

```sh
tns run android
```

or

```sh
tns run ios
```

## Using `tns` CLI

1) Create a NativeScript app

```sh
tns create sample-app
```

2) Install `nativescript-vue`

```sh
npm install --save nativescript-vue
```
3) Change `app.js` content to:

```javascript
const Vue = require('nativescript-vue/dist/index');

new Vue({

  template: `
    <page>
      <stack-layout>
        <label text="{{ message }}"></label>
      </stack-layout>
    </page>
  `,

  data() {
    message: "Hello Vue!",
  },

}).$start();
```

4) Run the app on Android or iOS:

```sh
tns run android
```

or

```sh
tns run ios
```