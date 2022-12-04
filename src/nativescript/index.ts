import { Application, View } from "@nativescript/core";
import { ComponentPublicInstance } from "@vue/runtime-core";
import { registerCoreElements } from "./elements";

// export all ns stuff in a single file to allow easy mocking for testing...

export function init() {
  registerCoreElements();

  global.__onLiveSyncCore = () => {
    Application.getRootView()?._onCssStateChange();
  };
}

export function startApp(rootComponent: ComponentPublicInstance) {
  Application.run({
    create() {
      return rootComponent.$el.nativeView;
    },
  });
}

export function resetRoot(view: View) {
  Application.resetRootView({
    create() {
      return view;
    },
  });
}

export { isAndroid, isIOS } from "@nativescript/core";

// export const isAndroid = false;
// export const isIOS = false;
