import { View } from '@nativescript/core';
import {
  App,
  Component,
  RendererElement,
  RendererNode,
  VNode,
} from '@vue/runtime-core';
import { NSVNode, NSVRoot } from './dom';
import { renderer } from './renderer';

type Props = Record<string, unknown>;

const __DEV__ = true;

let rootApp: App = null;

export const setRootApp = (app: App) => {
  rootApp = app;
};

export const createNativeView = <T = View>(
  component: Component,
  props?: Props,
  contextOverrides?: { reload?(): void },
) => {
  let isMounted = false;
  const newApp = renderer.createApp(component, props);
  // Destructure so as not to copy over the root app instance
  const { app, ...rootContext } = rootApp._context;
  const context = { ...rootContext, ...contextOverrides };

  type M = VNode<RendererNode, RendererElement, { nativeView: T }>;

  return {
    context,
    get vnode() {
      return newApp._instance?.vnode;
    },
    get nativeView(): T {
      return this.vnode?.el.nativeView;
    },
    mount(root: NSVNode = new NSVRoot()) {
      if (isMounted) {
        return this.vnode as M;
      }

      Object.keys(context).forEach((key) => {
        newApp._context[key] = context[key];
      });

      newApp.mount(root);

      isMounted = true;

      return this.vnode as M;
    },
    unmount() {
      if (!isMounted) return;

      newApp.unmount();

      isMounted = false;
    },
  };
};

export const ELEMENT_REF = Symbol(__DEV__ ? `elementRef` : ``);

const onRE = /^on.+/;
export const isOn = (key: string) => onRE.test(key);

export const isAndroidKey = (key: string) => key.startsWith('android:');

export const isIOSKey = (key: string) => key.startsWith('ios:');

export const isBoolean = (value: unknown): boolean => {
  return typeof value === 'boolean' || value instanceof Boolean;
};
