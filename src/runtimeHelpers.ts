import { View } from '@nativescript/core';
import {
  App,
  Component,
  ComponentPublicInstance,
  RendererElement,
  RendererNode,
  VNode,
} from '@vue/runtime-core';
import { NSVNode, NSVRoot } from './dom';
import { renderer } from './renderer';

type VueViewOptions = {
  props?: Record<string, unknown>;
  on?: Record<string, (...args: any[]) => any>;
};

const __DEV__ = true;

let rootApp: App = null;

export const setRootApp = (app: App) => {
  rootApp = app;
};

export const createNativeView = <T = View>(
  component: Component,
  options?: VueViewOptions,
  contextOverrides?: { reload?(): void },
) => {
  let isMounted = false;
  let vm: ComponentPublicInstance | null;

  const propsAndListeners = buildPropsAndListeners(options);
  const newApp = renderer.createApp(component, propsAndListeners);
  // Destructure so as not to copy over the root app instance
  const { app, ...rootContext } = rootApp._context;
  const context = { ...rootContext, ...contextOverrides };

  type M = VNode<RendererNode, RendererElement, { nativeView: T }>;

  return {
    context,
    get vnode() {
      return vm?.$.vnode;
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

      vm = newApp.mount(root);

      isMounted = true;

      return this.vnode as M;
    },
    unmount() {
      if (!isMounted) return;

      vm = null;
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

function buildPropsAndListeners(options: VueViewOptions){
  const listeners = Object.entries(options?.on ?? {}).reduce((listeners, [key, value]) => {
    listeners['on' + key.charAt(0).toUpperCase() + key.slice(1)] = value;
    return listeners;
  }, {} as { [key: string]: (...args: any[]) => any });

  return Object.assign(options?.props ?? {}, listeners);
}
