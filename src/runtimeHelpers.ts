import { View } from '@nativescript/core';
import {
  App,
  Component,
  ComponentPublicInstance,
  RendererElement,
  RendererNode,
  VNode,
  VNodeProps,
} from '@vue/runtime-core';
import { NSVNode, NSVRoot } from './dom';
import { renderer } from './renderer';

let rootApp: App = null;
export const setRootApp = (app: App) => {
  rootApp = app;
};

export type ContextOverrides = { reload?(): void };
export type CreateNativeViewProps<P> = Partial<
  P & VNodeProps & Record<string, any>
>;

export function createNativeView<T = View, P = any>(
  component: Component<P>,
  props?: CreateNativeViewProps<P>,
  contextOverrides?: ContextOverrides,
) {
  let isMounted = false;
  let vm: ComponentPublicInstance | null;
  let currentApp = renderer.createApp(component, props);
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

      // Create a NEW app instance for remount (after HMR unmount) as Vue doesn't allow mounting the same app instance twice
      if (!currentApp._instance) {
        currentApp = renderer.createApp(component, props);
      }

      Object.keys(context).forEach((key) => {
        currentApp._context[key] = context[key];
      });

      vm = currentApp.mount(root);

      // Set reload callback on the component instance's appContext, for HMR to work on navigated pages
      if (context.reload && vm && (vm as any).$?.appContext) {
        (vm as any).$.appContext.reload = context.reload;
      }

      isMounted = true;

      return this.vnode as M;
    },
    unmount() {
      if (!isMounted) return;

      vm = null;
      currentApp.unmount();

      isMounted = false;
    },
  };
}

export const ELEMENT_REF = Symbol(__DEV__ ? `elementRef` : ``);

const onRE = /^on.+/;
export const isOn = (key: string) => onRE.test(key);

export const isAndroidKey = (key: string) => key.startsWith('android:');

export const isIOSKey = (key: string) => key.startsWith('ios:');

export const isBoolean = (value: unknown): boolean => {
  return typeof value === 'boolean' || value instanceof Boolean;
};
