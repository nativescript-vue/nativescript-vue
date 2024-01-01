<p align="center">
  <img src="https://user-images.githubusercontent.com/879060/205505950-70769439-ff3e-4ecc-b0cd-1385483a847c.jpg">
  <i>Yes, the image needs to be updated :)</i>
</p>

<h1 align="center">NativeScript-Vue3 RC</h1>

<p align="center">
    <a href="https://www.npmjs.com/package/nativescript-vue">
       <img src="https://img.shields.io/npm/v/nativescript-vue/rc.svg" alt="npm">
    </a>
    <a href="https://github.com/nativescript-vue/nativescript-vue/blob/master/LICENSE">
       <img src="https://img.shields.io/github/license/nativescript-vue/nativescript-vue.svg" alt="license">
    </a>
</p>

NativeScript-Vue with Vue3 support now in RC!

## Quick start

To get started, you can use the [StackBlitz Template](https://stackblitz.com/fork/github/nativescript-vue/nativescript-vue/tree/main/packages/stackblitz-template?file=src%2Fcomponents%2FHome.vue&title=NativeScript%20Starter%20Vue3)

...or locally:

```bash
ns create myAwesomeApp --template @nativescript-vue/template-blank@rc

cd myAwesomeApp
ns run ios|android
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

If you encounter any issues, please open a new issue with as much detail as possible.

- [Join Discord](https://nativescript.org/discord)

## Looking for V2?

The V2 version has been moved to the [v2 branch](https://github.com/nativescript-vue/nativescript-vue/tree/v2)
