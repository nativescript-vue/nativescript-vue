import { VNodeProps } from "@vue/runtime-core";

import { NSVComment, NSVElement, NSVNode, NSVText } from "../dom";

export function insert(
  el: NSVNode,
  parent: NSVElement,
  anchor?: NSVNode | null | undefined
): void {
  // console.log("insert", el, parent, anchor);
  if (anchor !== null) {
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
  // console.log("createElement");
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
  // console.log("parentNode?", node);
  return node.parentNode;
}

export function nextSibling(node: NSVNode): NSVNode | null {
  return node.nextSibling;
}

export const nodeOps = {
  insert,
  remove,
  createElement,
  createText,
  createComment,
  setText,
  setElementText,
  parentNode,
  nextSibling,
  //   querySelector,
  //   setScopeId,
};
