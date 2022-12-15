import {
  AppContext,
  RendererElement,
  resolveComponent as resolveComponentCore,
  VNode,
} from "@vue/runtime-core";
import type { CreateAppFunction, Plugin } from "@vue/runtime-core";

import { BUILT_IN_COMPONENTS } from "./components";

import { NSVElement, NSVRoot } from "./dom";
import { init, resetRoot, startApp } from "./nativescript";
import { renderer } from "./renderer";

import { install as modalsPlugin } from "./plugins/modals";
import { install as navigationPlugin } from "./plugins/navigation.v2";
import { isKnownView, registerElement } from "./registry";

declare module "@vue/runtime-core" {
  interface App {
    start(): ComponentPublicInstance | undefined;
    mount(
      rootContainer?: NSVRoot | string,
      isHydrate?: boolean,
      isSVG?: boolean
    ): ComponentPublicInstance;
    registerElement: typeof registerElement;
  }
}

init();

export * from "./dom";
export * from "./registry";
export * from "./renderer";

export * from "@vue/runtime-dom";
export { vShow } from "./directives/vShow";
export { $showModal } from "./plugins/modals";
export { $navigateTo, $navigateBack } from "./plugins/navigation.v2";

export const APP_USES = Symbol("app_uses");

// creates a special root container that calls resetRoot whenever it's children change
function createAppRoot() {
  const defaultRoot = new NSVRoot();

  // flag to indicate when we need to call resetRoot
  // usually happens when the root component is re-mounted (HMR)
  let shouldResetRoot = false;

  const appendChild = defaultRoot.appendChild.bind(defaultRoot);
  const removeChild = defaultRoot.removeChild.bind(defaultRoot);

  defaultRoot.removeChild = (el) => {
    removeChild(el);

    shouldResetRoot = true;
  };

  defaultRoot.appendChild = (el) => {
    appendChild(el);

    if (shouldResetRoot) {
      resetRoot((el as NSVElement).nativeView);
    }
  };

  return defaultRoot;
}

export let rootAppContext: AppContext;
export const renderInRootAppContext = (
  vnode: VNode,
  container: RendererElement
) => {
  vnode.appContext = rootAppContext;
  render(vnode, container);
};

export const render = renderer.render;
export const createApp = ((...args) => {
  const app = renderer.createApp(...args);
  const { mount } = app;

  app.registerElement = registerElement;

  app.mount = (...args) => {
    if (!args.length) {
      return mount(new NSVRoot(), false, false);
    }
    return mount(...args);
  };

  app.start = () => {
    const componentInstance = app.mount(createAppRoot(), false, false);
    startApp(componentInstance);
    rootAppContext = app._context;

    return componentInstance;
  };

  // core plugins
  app.use(modalsPlugin);
  app.use(navigationPlugin);

  return app;
}) as CreateAppFunction<NSVElement>;

export function resolveComponent(name: string, maybeSelReference: boolean) {
  if (BUILT_IN_COMPONENTS[name]) {
    return BUILT_IN_COMPONENTS[name];
  }

  if (isKnownView(name)) {
    return name;
  }

  const component = resolveComponentCore(name, maybeSelReference);
  return component;
}
