import { View } from '@nativescript/core';
import {
  AppContext,
  Component,
  h,
  RendererElement,
  RendererNode,
  VNode,
} from '@vue/runtime-core';
import { NSVNode, NSVRoot } from './dom';
import { renderer } from './renderer';

type Props = Record<string, unknown>;

const __DEV__ = true;

let rootContext: AppContext = null;

export const setRootContext = (context: AppContext) => {
  rootContext = context;
};

export const createNativeView = <T = View>(
  component: Component,
  props?: Props,
  contextOverrides?: any
) => {
  let vnode: VNode;
  let isMounted = false;
  let container: NSVNode;
  const context = { ...rootContext, ...contextOverrides };

  type M = VNode<RendererNode, RendererElement, { nativeView: T }>;

  return {
    context,
    get nativeView(): T {
      return vnode.el.nativeView;
    },
    mount(root: NSVNode = new NSVRoot()) {
      if (isMounted) {
        return vnode as M;
      }

      vnode = h(component, props);

      vnode.appContext = context;

      renderer.render(vnode, root);

      isMounted = true;
      container = root;

      return vnode as M;
    },
    unmount() {
      if (!isMounted) return;
      vnode = null;
      renderer.render(null, container);
      isMounted = false;
      container = null;
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
