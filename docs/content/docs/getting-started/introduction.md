---
title: Introduction
contributors: [rigor789, tjvantoll, charles-salmon]
---

# Introduction

## What is [NativeScript](https://www.nativescript.org/)?

NativeScript is an open source framework for building truly native mobile applications using JavaScript.

## What is [Vue.js](https://vuejs.org/)?

Vue (pronounced /vjuː/, like view) is a progressive JavaScript framework for building user interfaces. The core library is focused on the view layer only, and is very easy to pick up and integrate with other libraries or existing projects.

## What is NativeScript-Vue?

NativeScript-Vue is a custom renderer for Vue 3. Your components, templates, reactivity and plugins are the real Vue, but instead of DOM elements the templates render NativeScript views, which in turn are native iOS and Android views.

If you have used Vue.js before you will feel right at home with NativeScript-Vue.

## Why would you use this?

There are many options to build mobile apps. Here are some situations where we think NativeScript-Vue is a great fit.

- **You need a truly native iOS and Android app**: NativeScript builds your apps using native user interface components on iOS and Android. The apps you build are not web-based, and therefore are not subject to the limitations inherent in WebView-based application frameworks. NativeScript also gives you [direct access to the native APIs](/docs/essentials/full-native-api-access) and [an extensive collection of plugins](https://docs.nativescript.org/plugins/) to tie into native device features.
- **You like JavaScript**: With NativeScript you write your mobile applications in JavaScript or TypeScript — not Objective-C, not Swift, not Kotlin and not Java. If you like JavaScript, you’ll love writing native iOS and Android apps with the same language you use in your Web and/or Node apps.
- **You like Vue**: Vue is known for its simple approach to the view layer. If you like building web apps with Vue, you’ll be right at home with NativeScript-Vue, as you’ll be using the same syntax for handling common tasks like data binding and event handling.

## What’s the catch?

If you have existing Vue experience, there are two big things you’ll need to learn to be successful with NativeScript-Vue.

- **Working with the NativeScript CLI**: NativeScript is a framework for building iOS and Android apps, not web apps. You’ll need to learn how a few commands work in the NativeScript CLI, and some basics of how iOS simulators and Android emulators work.
- **Learning the NativeScript UI components**: Because NativeScript uses native user interface components, HTML controls like `<div>` and `<span>` don’t exist in NativeScript. Instead you’ll need to learn a [new set of components](https://docs.nativescript.org/ui) you can use to render your interfaces. The [Gotchas](/docs/essentials/gotchas) page collects the differences that most often surprise developers coming from the web.

Don’t worry though. Although there is a learning curve for working with NativeScript-Vue, you should find things much easier than learning iOS or Android from the ground up. After all, you’ll still be writing your source code in JavaScript and Vue.

## Want to get involved?

NativeScript-Vue is an open source project and contributions are very much encouraged. Check out the [project’s contributing guide](/docs/contributing) and **join us on the #vue channel on the [NativeScript Community Discord](https://nativescript.org/discord)**.

## How stable is this project?

NativeScript-Vue 3 is stable and used in production apps. It tracks the current Vue 3 and NativeScript releases, and the [changelog](https://github.com/nativescript-vue/nativescript-vue/blob/main/CHANGELOG.md) lists what changed in each version. Found something missing or broken? [Open an issue](https://github.com/nativescript-vue/nativescript-vue/issues), or ask in the #vue channel on Discord.
