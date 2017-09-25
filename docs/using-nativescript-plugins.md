---
title: Using NativeScript Plugins
---

Plugins work as in any other NativeScript app, but you may wonder how UI plugin would work with Vue.

UI plugins work almost identical to how you'd use a NativeScript UI plugin in an Angular app. For instance consider this example usage of [nativescript-gradient](https://github.com/EddyVerbruggen/nativescript-gradient) which is used in the [listview sample](samples/app/app-with-list-view.js):

Install the plugin by running this command in the samples folder:

```sh
tns plugin add nativescript-gradient
```

Open your vue file and right after the imports at the top, do:

```js
Vue.registerElement("gradient", () => require("nativescript-gradient").Gradient);
```

Then in your view template, add this to recreated the gradient in the sample:

```xml
<gradient direction="to right" colors="#FF0077, red, #FF00FF" class="p-15">
  <label class="p-5 c-white" horizontalAlignment="center" text="My gradients are the best." textWrap="true"></label>
  <Label class="p-5 c-white" horizontalAlignment="center" text="It's true." textWrap="true"></Label>
</gradient>
```
