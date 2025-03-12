<p align="center">
  <img src="https://github.com/user-attachments/assets/2bbcb9c7-57ad-4649-9891-d1b901ac268f">
</p>

<h1 align="center">NativeScript-Vue3</h1>

<p align="center">
    <a href="https://www.npmjs.com/package/nativescript-vue">
       <img src="https://img.shields.io/npm/v/nativescript-vue/latest.svg" alt="npm"/>
    </a>
    <a href="https://github.com/nativescript-vue/nativescript-vue/blob/master/LICENSE">
       <img src="https://img.shields.io/github/license/nativescript-vue/nativescript-vue.svg" alt="license"/>
    </a>
</p>

NativeScript-Vue now supports Vue 3 and is generally available! This version brings improved reactivity, a modern plugin system, and better TypeScript support.

## Quick Start

To get started, you can use the [StackBlitz Template](https://stackblitz.com/fork/github/nativescript-vue/nativescript-vue/tree/main/packages/stackblitz-template?file=src%2Fcomponents%2FHome.vue&title=NativeScript%20Starter%20Vue3%20Beta).

Or, set up locally:

```sh
ns create myAwesomeApp --template @nativescript-vue/template-blank@latest

cd myAwesomeApp
ns run ios|android
```

## Upgrading to v3

Please refer to our [Upgrade Guide](http://nativescript-vue.org/docs/getting-started/upgrade-guide).

## Using Vue Devtools

To enable Vue Devtools, run:

```sh
ns run ios|android --env.vueDevtools
```

🛠️ **Android Users:**
To allow Vue Devtools to connect, enable **cleartext HTTP traffic** in your `AndroidManifest.xml`:

```diff
<application ...
+  android:usesCleartextTraffic="true"
.../>
```

## Issues

If you encounter any issues, please open a new issue with as much detail as possible.

- [Join Discord](https://nativescript.org/discord)

## Looking for V2?

The V2 version has been moved to the [v2 branch](https://github.com/nativescript-vue/nativescript-vue/tree/v2)
