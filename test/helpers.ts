import { createApp, NSVElement, NSVNode, NSVRoot } from '../src';
import type { Component } from '@vue/runtime-core';

export function mount(component: Component) {
  const root = new NSVRoot();
  const app = createApp(component);
  const instance = app.mount(root);
  return { app, root, instance, el: root.el as NSVElement };
}

/** Text of the native children, in native order. */
export function nativeChildren(el: NSVElement): string[] {
  return el.nativeView._children.map((c: any) => c.text);
}

/** Text of the element children in NSVNode tree order (non-elements are skipped). */
export function elementChildren(el: NSVNode): string[] {
  return el.childNodes
    .filter((n): n is NSVElement => n instanceof NSVElement)
    .map((n) => n.nativeView.text);
}
