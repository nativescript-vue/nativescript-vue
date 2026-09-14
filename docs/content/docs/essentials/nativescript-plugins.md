---
contributors: [rigor789, vallemar]
---

# Using NativeScript Plugins

Plugins work as in [any other NativeScript app](https://docs.nativescript.org/plugins/), but you may wonder how _UI_ plugins work with Vue.

UI plugins work almost identically to how you'd use a NativeScript UI plugin in an Angular app.

## Sample use: nativescript-gradient

Let's review how you can use [nativescript-gradient](https://github.com/EddyVerbruggen/nativescript-gradient).

### Install plugin

```shell
$ npm install --save nativescript-gradient
```

> **NOTE:** If your plugin doesn't work right away, you might need to clean the project by removing the Platforms folders:

```shell
$ rm -rf platforms
```

### Register the plugin in your app

Open your app entry file (likely `app.js`, `main.js`, `app.ts` or `main.ts`) and add the following line at the top:

```JavaScript
import { registerElement } from "nativescript-vue";

registerElement('Gradient', () => require('nativescript-gradient').Gradient)
```

This requires and registers the plugin in your `Vue` instance. The `registerElement` function expects the name of the `<Element>` as the first argument, and a function that returns the plugin as its second argument. Provide the element name exactly as you are supposed to call it in your code. Provide the plugin name exactly as its npm package name.

### Use the plugin in your app

```HTML
<Gradient direction="to right" colors="#FF0077, red, #FF00FF">
  <Label text="Best gradient." style="color: white; padding: 20" />
</Gradient>
```
