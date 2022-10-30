import { resolveComponent as resolveComponentCore } from "@vue/runtime-core";
import type { CreateAppFunction } from "@vue/runtime-core";

import { BUILT_IN_COMPONENTS } from "./components";

import { NSVElement, NSVRoot } from "./dom";
import { init, startApp } from "./nativescript";
import { renderer } from "./renderer";

declare module "@vue/runtime-core" {
  interface App {
    start(): ComponentPublicInstance | undefined;
    mount(
      rootContainer?: NSVRoot | string,
      isHydrate?: boolean,
      isSVG?: boolean
    ): ComponentPublicInstance;
  }
}

init();

export * from "./dom";
export * from "./registry";
export * from "./renderer";

export * from "@vue/runtime-dom";
export { vShow } from "./directives/vShow";

export const render = renderer.render;
export const createApp = ((...args) => {
  const app = renderer.createApp(...args);
  const { mount } = app;

  app.mount = (...args) => {
    if (!args.length) {
      return mount(new NSVRoot(), false, false);
    }
    return mount(...args);
  };

  app.start = () => {
    const componentInstance = app.mount();
    startApp(componentInstance);

    return componentInstance;
  };

  return app;
}) as CreateAppFunction<NSVElement>;

export function resolveComponent(name: string, maybeSelReference: boolean) {
  console.log("RESOLVE COMPONENT", name);

  if (BUILT_IN_COMPONENTS[name]) {
    return BUILT_IN_COMPONENTS[name];
  }

  const component = resolveComponentCore(name, maybeSelReference);
  return component;
}
