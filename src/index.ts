import type { CreateAppFunction } from '@vue/runtime-core';
import {
  createBlock as createBlockCore,
  createElementBlock as createElementBlockCore,
  createElementVNode as createElementVNodeCore,
  createVNode as createVNodeCore,
  resolveComponent as resolveComponentCore,
} from '@vue/runtime-core';

import { BUILT_IN_COMPONENTS } from './components';

import { NSVElement, NSVRoot } from './dom';
import { init, resetRoot, startApp } from './nativescript';
import { renderer } from './renderer';

import { install as modalsPlugin } from './plugins/modals';
import { install as navigationPlugin } from './plugins/navigation';
import { isKnownView, registerElement } from './registry';
import { setRootApp } from './runtimeHelpers';

declare module '@vue/runtime-core' {
  interface App {
    start(): ComponentPublicInstance | undefined;
    mount(
      rootContainer?: NSVRoot | string,
      isHydrate?: boolean,
      isSVG?: boolean,
    ): ComponentPublicInstance;
    registerElement: typeof registerElement;
  }
}

init();

export * from './dom';
export * from './registry';
export * from './renderer';
export * from './components';
export { ELEMENT_REF, createNativeView } from './runtimeHelpers';

export * from '@vue/runtime-core';
export { vShow } from './directives/vShow';
export { $showModal } from './plugins/modals';
export { $navigateTo, $navigateBack } from './plugins/navigation';

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
    setRootApp(app);

    return componentInstance;
  };

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

/**
 * Checks if the type has a constructor.name that matches a known view or built-in component
 * If so, returns the name of the view or component. This allows {N} element imports to be
 * used inside script setup context without requiring aliasing.
 */
function maybeConvertToKnownComponentOrViewName(type: any) {
  const name = type?.prototype?.constructor?.name;
  if (name) {
    if (BUILT_IN_COMPONENTS[name]) {
      return BUILT_IN_COMPONENTS[name];
    }

    if (isKnownView(name)) {
      return name;
    }
  }

  return type;
}

/**
 * Wraps the original function and replaces the first argument if it matches
 * a known view or built-in component.
 */
function wrapCreate<T>(originalFunction: T): T {
  return ((type: any, ...args: any) => {
    return (originalFunction as any)(
      maybeConvertToKnownComponentOrViewName(type),
      ...args,
    );
  }) as T;
}

export const createBlock = wrapCreate(createBlockCore);
export const createElementBlock = wrapCreate(createElementBlockCore);
export const createElementVNode = wrapCreate(createElementVNodeCore);
export const createVNode: typeof createVNodeCore = wrapCreate(createVNodeCore);
