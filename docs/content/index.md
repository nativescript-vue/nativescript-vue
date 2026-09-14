---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "NativeScript-Vue"
  text: "Delightful mobile app development."
  tagline: The entire native platform under your fingertips in the comfort of Vue and JavaScript.
  image:
    src: https://art.nativescript-vue.org/misc/phone.svg
  actions:
    - theme: brand
      text: Get Started
      link: /docs/getting-started/installation
    - theme: alt
      text: View on GitHub
      link: https://github.com/nativescript-vue/nativescript-vue

features:
  - title: Full Vue 3 Experience
    icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 256 220.8">
        <path fill="#41B883" d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36Z"/>
        <path fill="#41B883" d="m0 0 128 220.8L256 0h-51.2L128 132.48 50.56 0H0Z"/>
        <path fill="#35495E" d="M50.56 0 128 133.12 204.8 0h-47.36L128 51.2 97.92 0H50.56Z"/>
      </svg>
    details: |
      The full Vue experience that runs as a mobile app. No translation layer, your actual Vue code runs as-is.
  - title: Native API Access
    icon: ⚡️
    details: |
      Thanks to NativeScript's superpower, you get access to ALL native apis right in your JavaScript.
      <br>
      <br>
      <a href="/docs/essentials/full-native-api-access">Learn more &rightarrow;</a>
  - title: Unmatched flexibility
    icon: 💪
    details: |
      NativeScript supports libraries from various sources, <abbr title="Node Package Manager">NPM</abbr>, Cocoapods, <abbr title="Swift Package Manager">SPM</abbr>, Maven/Gradle and more.
      <br>
      <br>
      <a href="/docs/essentials/full-native-api-access">Learn more &rightarrow;</a>
---

### Does it work with Vue 3 or the Composition API?

Yes! Since **3.0**, Vue 3 is supported. You can use both the Options and the Composition API per your preference.

### What is NativeScript-Vue?

**tl;dr** it's a custom renderer for Vue that renders to NativeScript views.

### Does it run inside a WebView?

No, it runs your JavaScript/Vue code in an embedded JavaScript runtime (using V8, the engine powering Node.js, Chromium-based browsers, Cloudflare workers and more...) that exposes bindings to all native APIs automatically (discovered at build-time).

### So the user interface is native?

Yes, all `<template>` blocks are rendered via NativeScript Views. These views are responsible for instantiating and translating attributes and CSS styling to their native equivalents. ie. `<Label text="Hello World">` will render a `UILabel` on iOS and an `android.widget.TextView` on Android.

### Am I limited to elements provided by NativeScript-Vue?

No, both NativeScript and NativeScript-Vue are built in a way that it's easy for plugins (or your own code) to register new elements. For example, you can install any 3rd party (ui) library and expose it to your `<template>` blocks. The majority of NativeScript plugins do just that: wrap native libraries under a common api for easy consumption.

### ... I'm stuck, where do I get help?

Learning a new technology always has it's challenges. The [NativeScript Community Discord](https://nativescript.org/discord) is the best place to ask for help.

### Who's behind this?

NativeScript-Vue is primarily maintained by [@rigor789](https://github.com/rigor789) with various amazing [contributors from the community](https://github.com/nativescript-vue/nativescript-vue/graphs/contributors).
