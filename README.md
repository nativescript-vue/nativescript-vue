<p align="center">
  <img src="https://github.com/user-attachments/assets/2bbcb9c7-57ad-4649-9891-d1b901ac268f">
</p>

<h1 align="center">NativeScript-Vue3</h1>

<p align="center">
    <a href="https://www.npmjs.com/package/nativescript-vue">
       <img src="https://img.shields.io/npm/v/nativescript-vue/latest.svg" alt="npm"/>
    </a>
    <a href="https://github.com/nativescript-vue/nativescript-vue/blob/main/LICENSE">
       <img src="https://img.shields.io/github/license/nativescript-vue/nativescript-vue.svg" alt="license"/>
    </a>
</p>

NativeScript-Vue now supports Vue 3 and is generally available! This version brings improved reactivity, a modern plugin system, and better TypeScript support.

## Quick Start

To get started, you can use the [StackBlitz Template](https://stackblitz.com/fork/github/nativescript-vue/nativescript-vue/tree/main/packages/stackblitz-template?file=src%2Fcomponents%2FHome.vue&title=NativeScript%20Starter%20Vue3).

Or, set up locally:

```sh
ns create myAwesomeApp --template @nativescript-vue/template-blank@latest

cd myAwesomeApp
ns run ios|android
```

## Upgrading to v3

Please refer to our [Upgrade Guide](https://nativescript-vue.org/docs/essentials/upgrade-guide).

## Using Vue Devtools

Install the standalone devtools in your app (it is not pulled in by
nativescript-vue because it depends on Electron):

```sh
npm i -D @vue/devtools@^8
```

Then run with the `vueDevtools` flag. The devtools window opens on the host
machine and the app connects to it:

```sh
ns run ios|android --env.vueDevtools
```

A free port from 8098 up is picked automatically; pass `--env.vueDevtoolsPort=9000`
to pin one, or `--env.vueDevtoolsHost=http://192.168.1.10` to reach the
devtools from a physical device. `--env.vueDevtoolsSpawn=false` skips
launching the devtools app, for when one is already running, and
`--env.vueDevtoolsDebug` logs the socket traffic between app and devtools.

🛠️ **Android Users:**
To allow Vue Devtools to connect, enable **cleartext HTTP traffic** in your `AndroidManifest.xml`:

```diff
<application ...
+  android:usesCleartextTraffic="true"
.../>
```

## TypeScript

Types for every core element, `$navigateTo`, `$showModal` and friends ship
with the package. Third-party libraries such as Pinia or vue-i18n augment the
`vue` module, and code often imports from `vue`. The templates map `vue` to
`nativescript-vue` in `tsconfig.json` so both resolve; add this to existing
projects:

```json
{
  "compilerOptions": {
    "paths": {
      "vue": ["./node_modules/nativescript-vue"]
    }
  },
  "vueCompilerOptions": {
    "lib": "nativescript-vue"
  }
}
```

## Issues

If you encounter any issues, please open a new issue with as much detail as possible.

- [Join Discord](https://nativescript.org/discord)

## Looking for V2?

The V2 version has been moved to the [v2 branch](https://github.com/nativescript-vue/nativescript-vue/tree/v2)
