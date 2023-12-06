<p align="center">
    <img src="https://user-images.githubusercontent.com/879060/205505950-70769439-ff3e-4ecc-b0cd-1385483a847c.jpg">
</p>

<h1 align="center">NativeScript-Vue3 Beta</h1>

<p align="center">
    <a href="https://www.npmjs.com/package/nativescript-vue">
       <img src="https://img.shields.io/npm/v/nativescript-vue/beta.svg" alt="npm">
    </a>
    <a href="https://github.com/nativescript-vue/nativescript-vue/blob/master/LICENSE">
       <img src="https://img.shields.io/github/license/nativescript-vue/nativescript-vue.svg" alt="license">
    </a>
</p>

NativeScript-Vue with Vue3 support now in beta!


## Quick start

<!-- To get started, you can use the [StackBlitz Template](https://stackblitz.com/fork/nativescript-vue3-beta) -->

To get started, you can use the [StackBlitz Template](https://stackblitz.com/fork/github/nativescript-vue/nativescript-vue/tree/main/packages/stackblitz-template?file=src%2Fcomponents%2FHome.vue&title=NativeScript%20Starter%20Vue3%20Beta)

...or locally:

```bash
ns create myAwesomeApp --template @nativescript-vue/template-blank@beta

cd myAwesomeApp
ns run ios|android
```

## Update to v3 from v2

### Start of the application
As the way of starting a vue application, NativeScript-Vue has changed, has also done so to follow the vueE3 format.

Before (v2)
```ts
import Vue from 'nativescript-vue'
import Home from './components/Home.vue'

new Vue({
  render: (h) => h('frame', [h(Home)]),
}).$start()
```

Now (v3)
```ts
import { createApp } from 'nativescript-vue';
import Home from './components/Home.vue';

const app = createApp(Home);
app.start();
```

Note that now we do not pass the `Frame` main of its application. Place the `Frame` in its main component. Example: https://github.com/nativescript-vue/nativescript-vue/blob/main/packages/template-blank/src/components/Home.vue#L33

### Plugins
The way of declaring plugins has also changed, now the function `registerElement` imported from Nativescript-Vue is now used.

Before (v2)
```ts
import Vue from 'nativescript-vue'
import Home from './components/Home.vue'

Vue.registerElement('Gradient', () => require('nativescript-gradient').Gradient);

new Vue({
  render: (h) => h('frame', [h(Home)]),
}).$start()
```

Now (v3)
```ts
import { createApp, registerElement } from 'nativescript-vue';
import Home from './components/Home.vue';

registerElement('Gradient', () => require('nativescript-gradient').Gradient);

const app = createApp(Home);
app.start();
```

There are plugins that support the `.use` of Vue3 format as `@nativescript-comminky/ui-collectionView`, if the plugin supports this format can declare it as follows. Usually, with `registerElement` they should be able to declare all plugins.

Now (v3)
```ts
import { createApp, registerElement } from 'nativescript-vue';
import Home from './components/Home.vue';
import CollectionView from '@nativescript-community/ui-collectionview/vue3';

const app = createApp(Home);
app.use(CollectionView);
app.start();
```

### Navigation
The navigation has undergone few changes, the only change is that we must import the functions `$navigateTo`, `$navigateBack` and `$showModal` from NativeSscript-Vue.

```ts
<script lang="ts" setup>
import { $navigateTo, $navigateBack, $showModal } from 'nativescript-vue';
import MyComponent from './components/MyComponent.vue';

function navigate(){
    $navigateTo(MyComponent, {...});
}

function back(){
    $navigateBack();
}

function showModal(){
    $showModal(MyComponent, {...});
}
</script>
```


### ListView
In the lists there are 2 changes.
1. Before the lists expected a `for`, now awaits an`: items` in which we will pass our array or observablearray.
2. `v-template` is now `template`, waiting `#default=" {item, index}` to be able to access the current item and index. Note in the example that your item can typar.`#Default` is the name of his template, if he has a template that is called `header` for example, declare this `#header="{item, index}`.

Before (v2)
```html
<ListView for="item in listOfItems" @itemTap="onItemTap">
  <v-template>
    <!-- Shows the list item label in the default color and style. -->
    <Label :text="item.text" />
  </v-template>
</ListView>
```

Now (v3)
```html
 <ListView :items="items" >
    <template #default="{ item, index } : { item: MyType, index: number }">
      <GridLayout columns="*, auto" class="px-4">
        <Label :text="item" />
        <Label :text="index" />
      </GridLayout>
    </template>
</ListView>
```

## Vue Devtools

To use VueDevtools, run:

```bash
ns run ios|android --env.vueDevtools
```

This will launch the standalone VueDevtools, and connect to it once the app launches. Right now, devtools are only supported on iOS Simulators and Android Emulators, but physical device support should come soon (requires configuring a host/port that the device can connect to.).

On android, you must enable cleartext http traffic, otherwise any connections are silently dropped by the system. In the `App_Resources/Android/src/main/AndroidManifext.xml` add the following to your existing `<application>` tag:

```diff
<application ...
+  android:usesCleartextTraffic="true"
.../>
```

## Issues

If you encounter any issues, please open a new issue with as much detail as possible. This is **beta** software, so there might be bugs.

- [Join Discord](https://nativescript.org/discord)

## Looking for V2?

The V2 version has been moved to the [v2 branch](https://github.com/nativescript-vue/nativescript-vue/tree/v2)
