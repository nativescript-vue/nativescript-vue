# NativeScript Vue Plugin

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

![](logo.png)

This plugin integrates [Vue](https://vuejs.org/) and [NativeScript](https://www.nativescript.org/), allowing you to build cross-platform iOS and Android apps using Vue.

This project is in its very early stages, so please don't try to use it for any actual applications—yet 😄

## Contributing

 If you feel like contributing to this project, that’s awesome! Start by reading [this repo’s `CONTRIBUTING.MD`](https://github.com/rigor789/nativescript-vue/blob/master/CONTRIBUTING.md) file for details on the required development setup, how to send pull requests, and how to run this repo’s sample app.

If you’d like to get involved with making Vue integration for NativeScript happen, join us in the #vue channel on the [NativeScript community Slack](http://tinyurl.com/nativescriptSlack). 

## Using other plugins
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