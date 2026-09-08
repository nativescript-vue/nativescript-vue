import type { App, CreateAppFunction } from '@vue/runtime-core';
import { Frame } from '@nativescript/core';
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

import { hasOpenModals, install as modalsPlugin } from './plugins/modals';
import { install as navigationPlugin } from './plugins/navigation';
import { isKnownView, registerElement } from './registry';
import { ELEMENT_REF, nameForDevtools, setRootApp } from './runtimeHelpers';
import { logger } from './util/logger';

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
  interface AppContext {
    /** Set by runtime-core in development; re-renders the root vnode. */
    reload?(): void;
  }
}

init();

export * from './components';
export * from './dom';
export * from './registry';
export * from './types';
export * from './renderer';
export { createNativeView, ELEMENT_REF, isOn } from './runtimeHelpers';

export * from '@vue/runtime-core';
export { vShow } from './directives/vShow';
export { $closeModal, $showModal } from './plugins/modals';
export { $navigateBack, $navigateTo } from './plugins/navigation';
export { KeepAlive, TransitionGroup } from './renderer/runtimeDomOverrides';

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

/**
 * Vue's own root reload re-renders the root vnode, which remounts the root
 * component and, through createAppRoot, replaces the app's root view: every
 * navigated page and open modal is lost. While the user is away from the
 * root page, re-render the root in place instead. Only the template is
 * refreshed that way; a changed <script> needs the full remount, which
 * happens the next time the root reloads with nothing on top of it.
 */
function keepPlaceOnRootReload(app: App) {
  const remount = app._context.reload;

  app._context.reload = () => {
    const instance = (app as any)._instance;

    if (!instance || !isAwayFromRootPage()) {
      return remount?.();
    }

    instance.render = instance.type.render ?? instance.render;
    instance.update();
    logger.warn(
      `[HMR] Root component re-rendered in place to keep the current page ` +
        `and modals. Changes to its <script> apply after a restart, or once ` +
        `you return to the root page and it reloads again.`,
    );
  };
}

function isAwayFromRootPage() {
  if (hasOpenModals()) {
    return true;
  }

  const frame = Frame.topmost();
  if (!frame) {
    return false;
  }
  if (frame.backStack.length > 0) {
    return true;
  }

  // pages rendered by the root app live under a <Frame> element; pages
  // from $navigateTo are mounted into a detached root
  const current = frame.currentPage?.[ELEMENT_REF] as NSVElement | undefined;
  return !!current && !(current.parentNode instanceof NSVElement);
}

export const render = renderer.render;
export const createApp = ((...args) => {
  nameForDevtools(args[0]);
  const app = renderer.createApp(...args);
  const { mount } = app;

  app.registerElement = registerElement;

  app.mount = (...args: Parameters<typeof mount>) => {
    if (!args.length) {
      return mount(new NSVRoot(), false, false);
    }
    return mount(...args);
  };

  app.start = () => {
    // mounted hooks run synchronously inside mount, and $navigateTo/$showModal
    // called from them need the root app context
    setRootApp(app);

    const componentInstance = app.mount(createAppRoot(), false, false);

    startApp(componentInstance);

    if (__DEV__) {
      keepPlaceOnRootReload(app);
    }

    return componentInstance;
  };

  app.use(modalsPlugin);
  app.use(navigationPlugin);

  app.config.errorHandler = (err, instance, info) => {
    console.error((info ? `Error during execution of ${info}: ` : ``) + err);

    if (__DEV__) {
      throw err;
    }
  };

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
