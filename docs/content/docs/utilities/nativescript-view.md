---
contributors: [vallemar]
---

# NativeScript View

Since NativeScript-Vue works on top of NativeScript, there are some cases in which it is necessary to create a NativeScript view from a Vue component, such as RootLayout and other scenarios.

A Vue component is not a NativeScript view, but it can easily generate a view with the `createNativeView` utility.

The `createNativeView` method allows to easily create a NativeScript view. Example.


```js
import { createNativeView } from "nativescript-vue"
import MyComponent from "./MyComponent.vue"

const node = createNativeView(MyComponent, {
    props: {
      foo: "bar",
      onChange(data){
        // can listen to events launched via `emit`. In this example: `emit("change")`
      }
    }
});
node.mount();
  
const nativeScriptView = node.nativeView;
```