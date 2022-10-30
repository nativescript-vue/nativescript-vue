import { Application } from "@nativescript/core";
import { ComponentPublicInstance } from "@vue/runtime-core";
import { NSVRoot } from "../dom";
import { registerCoreElements } from "./elements";

// export all ns stuff in a single file to allow easy mocking for testing...

export function init() {
  registerCoreElements();
}

export function startApp(rootComponent: ComponentPublicInstance) {
  console.log("starting app...");
  Application.run({
    create() {
      return rootComponent.$el.nativeView
    },
  });
}

export { isAndroid, isIOS } from "@nativescript/core";

// export const isAndroid = false;
// export const isIOS = false;
