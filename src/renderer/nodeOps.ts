import { VNodeProps, RendererOptions } from "@vue/runtime-core";

import { NSVComment, NSVElement, NSVNode, NSVText } from "../dom";

export function insert(
  el: NSVNode,
  parent: NSVElement,
  anchor?: NSVNode | null | undefined
): void {
  // console.log("insert", el, parent.tagName, anchor);
  if (anchor !== null) {
    // console.log('insert before!')
    parent.insertBefore(el, anchor);
  } else {
    parent.appendChild(el);
  }
}

export function remove(el: NSVNode): void {
  if (el.parentNode != null) {
    el.parentNode.removeChild(el);
  }
}

export function createElement(
  type: string,
  isSVG?: boolean | undefined,
  isCustomizedBuiltIn?: string | undefined,
  vnodeProps?: (VNodeProps & { [key: string]: any }) | null | undefined
): NSVElement {
  // console.log("createElement", type);
  return new NSVElement(type);
}

export function createText(text: string): NSVNode {
  // console.log("createText");
  return new NSVText(text);
}

export function createComment(text: string): NSVNode {
  // console.log("createComment");
  return new NSVComment(text);
}

export function setText(node: NSVNode, text: string): void {
  // console.log("set text", node, text);
  node.text = text;
}

export function setElementText(node: NSVElement, text: string): void {
  // console.log("set element text", node, text);
  node.text = text;
}

export function parentNode(node: NSVNode): NSVElement | null {
  // console.log("parentNode?", node.nodeType);
  return node.parentNode;
}

export function nextSibling(node: NSVNode): NSVNode | null {
  return node.nextSibling;
}

export function cloneNode(node: NSVNode): NSVNode {
  console.log("CLONE NODE");
  return node;
}
// insertStaticContent?(content: string, parent: HostElement, anchor: HostNode | null, isSVG: boolean, start?: HostNode | null, end?: HostNode | null): [HostNode, HostNode];
export function insertStaticContent(
  content: string,
  parent: NSVElement,
  anchor: NSVNode,
  isSvg: boolean,
  start?: NSVNode,
  end?: NSVNode
): [NSVNode, NSVNode] {
  console.log("insert static content - not implemented.");

  return [undefined, undefined];
}

export function setScopeId(el: NSVElement, scopeId: string) {
  el.setAttribute(scopeId, "");
}

export const nodeOps: Omit<RendererOptions, "patchProp"> = {
  insert,
  remove,
  createElement,
  createText,
  createComment,
  setText,
  setElementText,
  parentNode,
  nextSibling,

  cloneNode,
  insertStaticContent,

  setScopeId,

  //   querySelector,
};
