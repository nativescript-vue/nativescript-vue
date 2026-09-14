---
contributors: [sis0k0]
---

# Code-Sharing

> This page is based on [Jen Looper](https://twitter.com/jenlooper)'s blog post [Code Sharing with NativeScript-Vue](https://www.nativescript.org/blog/code-sharing-with-nativescript-vue).

You can write applications for the web using Vue.js. Thanks to NativeScript-Vue, you can also write mobile applications. A code-sharing project is one where you keep the code for the web and mobile apps in one place. Learn how you can achieve code-sharing with the `vue-cli-plugin-nativescript-vue` package.

## Creating a code-sharing project

First, install the Vue CLI globally:

```bash
npm install -g @vue/cli
```


Then, scaffold a new Vue web application:

```bash
vue create web-mobile-project
```

Navigate to the newly created project and add `vue-cli-plugin-nativescript-vue`:

```bash
cd web-mobile-project
vue add vue-cli-plugin-nativescript-vue
```

You will be prompted to configure the plugin. The presets are fine, just make sure you use your own application identifier. Regarding the question, "Is this a brand new project", adding this plugin to an existing project will do a "non-destructive" addition of a mobile app to a web project. If you’re starting with a greenfielded app project, you can go ahead and keep that switch selected.

Once the plugin is installed, you can run the web and mobile applications with the `npm run` scripts provided in the plugin.

To build the web application and start a dev server, run:

```bash
npm run serve:web
```

To preview the mobile application, run:

```bash
npm run preview:android
# or
npm run preview:ios
```

## Project structure

In the default project structure, the web and mobile files reside in the same directory. Take a look, for example, at the two files `main.js` and `main.native.js`. Since they are the entry point for your mobile and web apps, and probably include separate platform plugins, they are differentiated by means of their naming convention. Any file named ``*.native.*`` will be rendered only for mobile.

Mount a web app:

**main.js**
```javascript
import Vue from 'vue';
import App from '~/App.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
```

Start a NativeScript-Vue app:

**main.native.js**
```javascript
import Vue from 'nativescript-vue';

import App from './App.vue';

Vue.config.silent = false;

new Vue({
  render: h => h('frame', [h(App)]),
}).$start();
```

Now take a look at `App.vue`, the single point of entry and the first Vue SFC with shared templates:

```vue
<template web>
  <div class="w-page">
    <div class="w-container">
      <img src="~/assets/logo.png" alt="logo" height="20%" width="20%">
      <HelloWorld :msg="msg"/>
    </div>
  </div>
</template>
<template native>
  <Page>
    <ActionBar :title="navbarTitle"/>
    <GridLayout rows="auto, auto">
      <HelloWorld :msg="msg"/>
    </GridLayout>
  </Page>
</template>
```

If you don’t have much markup, you can easily create a completely shared file with the parts designated per platform. Moreover, in this file you can share one script block between platforms; only the methods used by each platform will be picked up:

```javascript
<script>
  import HelloWorld from '~/components/HelloWorld';

  const { VUE_APP_MODE, VUE_APP_PLATFORM } = process.env;

  export default {
    components: {
      HelloWorld,
    },
    data() {
      return {
        navbarTitle: `App.vue`,
        msg: `Mode=${VUE_APP_MODE} and Platform=${VUE_APP_PLATFORM}`,
      };
    },
    methods: {
    }
  };
</script>
```

In this file, as well, an example of forked styles is given: import only the styles relevant to your platform:

```vue
<style web>
  @import '~styles/style-one';

  .w-page {
    height: 100%;
    width: 100%;
  }
</style>
<style native>
  @import '~styles/style-one';
</style>
```

> You can share assets by placing them in the provided assets folder.

Optionally, you can separate your templates by platform even on mobile; an example is included of an SFC that is divided for web and native (`HelloWorld.vue` and `HelloWorld.native.vue`), and there’s also the option of working separately on iOS and Android (`HelloWorld.ios.vue` and `HelloWorld.android.vue`).

Given the flexibility inherent in the generated code structure, the developer is given a lot of leeway in terms of using forked files, forked templates, scoping styles, and the amount of sharing done between the components of your app. The plugin lets you make the important architectural decisions based on your project’s needs, while offering a variety of options.

> What about the router? Since the Vue Router is not supported on mobile, we recommend using the Vue Router in the web app and using a strategy of manual routing on mobile. The team is working on a more sophisticated solution to allow shared routing on web and mobile, but for the time being, the above suggestion is our recommendation.

## Showcase Application

For a real-world code-sharing project with NativeScript-Vue, check out [Jen Looper](https://twitter.com/jenlooper)'s code-sharing project, [mandala-me](https://github.com/jlooper/mandala-me).
