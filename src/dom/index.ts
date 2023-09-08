import { markRaw } from '@vue/runtime-core';
import {
  getViewClass,
  getViewMeta,
  normalizeElementName,
  NSVViewMeta,
} from '../registry';
import { ELEMENT_REF } from '../runtimeHelpers';
import setValue from 'set-value';
// import unset from 'unset-value'

const __TEST__ = false;

export const enum NSVNodeTypes {
  TEXT = 'text',
  ELEMENT = 'element',
  COMMENT = 'comment',
  ROOT = 'root',
}

// View Flags indicate the kind of view the element is
// this avoids extra checks during runtime to determine
// the method to use for adding/removing child nodes
export const enum NSVViewFlags {
  NONE = 0,
  SKIP_ADD_TO_DOM = 1 << 0,
  CONTENT_VIEW = 1 << 1,
  LAYOUT_VIEW = 1 << 2,
  NO_CHILDREN = 1 << 3,
}

let nodeId = 0;

export abstract class NSVNode {
  protected constructor(nodeType: NSVNodeTypes) {
    this.nodeType = nodeType;
    this.nodeId = nodeId++;
  }

  nodeId: number;
  nodeType: NSVNodeTypes;

  private _text?: string | undefined;
  public get text(): string | undefined {
    return this._text;
  }
  public set text(value: string | undefined) {
    this._text = value;

    if (this.parentNode?.nodeType === NSVNodeTypes.ELEMENT) {
      this.parentNode.updateText();
    }
  }

  parentNode: NSVElement | null = null;
  childNodes: NSVNode[] = [];

  get nextSibling(): NSVNode | null {
    if (!this.parentNode) {
      return null;
    }

    const selfIndex = this.parentNode.childNodes.findIndex(
      (n) => n.nodeId === this.nodeId
    );

    if (selfIndex > -1 && selfIndex < this.parentNode.childNodes.length - 1) {
      return this.parentNode.childNodes[selfIndex + 1];
    }

    return null;
  }

  get prevSibling(): NSVNode | null {
    if (!this.parentNode) {
      return null;
    }

    const selfIndex = this.parentNode.childNodes.findIndex(
      (n) => n.nodeId === this.nodeId
    );

    if (selfIndex > 0) {
      return this.parentNode.childNodes[selfIndex - 1];
    }

    return null;
  }

  get firstChild() {
    return this.childNodes.length ? this.childNodes[0] : null;
  }

  get lastChild() {
    return this.childNodes.length
      ? this.childNodes[this.childNodes.length - 1]
      : null;
  }
}

export class NSVElement extends NSVNode {
  private readonly _tagName: string;
  private readonly _nativeView: any;
  private _meta: NSVViewMeta | undefined;
  private _attributeOriginalValue: Map<string, unknown> = new Map();

  constructor(tagName: string) {
    super(NSVNodeTypes.ELEMENT);

    this._tagName = normalizeElementName(tagName);
    const viewClass = getViewClass(tagName);
    this._nativeView = markRaw(new viewClass());
    this._nativeView[ELEMENT_REF] = this;
  }

  get tagName(): string {
    return this._tagName;
  }

  get nativeView() {
    return this._nativeView;
  }

  get style(): any | string {
    return this.nativeView.style;
  }

  set style(inlineStyle: any | string) {
    this.nativeView.style = inlineStyle;
  }

  get text(): string | undefined {
    return this.nativeView.text;
  }

  set text(t: string | undefined) {
    this.nativeView.text = t;
  }

  get meta() {
    if (this._meta) {
      return this._meta;
    }

    return (this._meta = getViewMeta(this.tagName));
  }

  addEventListener(
    event: string,
    handler: any,
    options: AddEventListenerOptions = {}
  ) {
    const { capture, once } = options;
    if (capture) {
      //   debug("Bubble propagation is not supported");
    }
    if (once) {
      const oldHandler = handler;
      const self = this;
      handler = (...args: any) => {
        oldHandler.call(null, ...args);
        self.removeEventListener(event, handler);
      };
    }

    this.nativeView.addEventListener(event, handler);
  }

  removeEventListener(event: string, handler?: any) {
    this.nativeView.removeEventListener(event, handler);
  }

  dispatchEvent(event: string) {
    this.nativeView.notify({ eventName: event, object: this.nativeView });
  }

  getAttribute(name: string): unknown {
    return this.nativeView[name];
  }

  setAttribute(name: string, value: unknown) {
    if (!this._attributeOriginalValue.has(name)) {
      this._attributeOriginalValue.set(name, this.nativeView[name]);
    }
    // this.nativeView[name] = value;
    setValue(this.nativeView, name, value);
  }

  removeAttribute(name: string) {
    // only remove attributes that we have set previously
    if (this._attributeOriginalValue.has(name)) {
      const originalValue = this._attributeOriginalValue.get(name);
      this._attributeOriginalValue.delete(name);

      // this.nativeView[name] = originalValue;
      setValue(this.nativeView, name, originalValue);
    }

    // potential issue: unsetValue is an empty object
    // not all properties/attributes may know/check for this
    // set(this.nativeView, name, unsetValue);
    // originally we deleted the property, but in case of built-in properties
    // this would break them. For example, deleting the padding property
    // will prevent us from changing the padding once we deleted it
    // that's not the expected behaviour.
    // unset(this.nativeView, name)
  }

  insertBefore(el: NSVNode, anchor?: NSVNode | null) {
    if (!anchor) {
      return this.appendChild(el);
    }

    const refIndex = this.childNodes.findIndex(
      (node) => node.nodeId === anchor.nodeId
    );

    if (refIndex === -1) {
      return this.appendChild(el);
    }

    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }

    this.childNodes.splice(refIndex, 0, el);
    el.parentNode = this;

    // find index to use for the native view, since non-visual nodes
    // (comment/text don't exist in the native view hierarchy)
    // todo: potentially refactor based on my benchmark:
    // https://www.measurethat.net/Benchmarks/Show/7450/0/filter-findindex
    const trueIndex = this.childNodes
      .filter((node) => node.nodeType === NSVNodeTypes.ELEMENT)
      .findIndex((node) => node.nodeId === el.nodeId);

    this.addChild(el, trueIndex);
  }

  appendChild(el: NSVNode) {
    this.childNodes.push(el);
    el.parentNode = this;

    this.addChild(el);
  }

  removeChild(el: NSVNode) {
    const index = this.childNodes.findIndex(
      (node) => node.nodeId === el.nodeId
    );

    if (index > -1) {
      this.childNodes.splice(index, 1);
      el.parentNode = null;
      if (el.nodeType === NSVNodeTypes.ELEMENT) {
        removeChild(el as NSVElement, this);
      } else if (el.nodeType === NSVNodeTypes.TEXT) {
        this.updateText();
      }
    }
  }

  // abstracted from appendChild, and insertBefore to avoid code duplication
  private addChild(el: NSVNode, atIndex?: number): void {
    if (el.nodeType === NSVNodeTypes.ELEMENT) {
      addChild(el as NSVElement, this, atIndex);
    } else if (el.nodeType === NSVNodeTypes.TEXT) {
      this.updateText();
    }
  }

  updateText() {
    this.setAttribute(
      'text',
      this.childNodes.reduce((text: string, currentNode) => {
        if (currentNode.nodeType !== NSVNodeTypes.TEXT) {
          return text;
        }
        return text + currentNode.text;
      }, '')
    );
  }
}

export class NSVComment extends NSVNode {
  constructor(text: string) {
    super(NSVNodeTypes.COMMENT);

    this.text = text;
  }
}

export class NSVText extends NSVNode {
  constructor(text: string) {
    super(NSVNodeTypes.TEXT);

    this.text = text;
  }
}

export class NSVRoot extends NSVNode {
  el?: NSVElement;

  constructor() {
    super(NSVNodeTypes.ROOT);
  }

  appendChild(el: NSVNode) {
    // console.log(`NSVRoot->appendChild(${el.nodeType})`)
    if (el instanceof NSVElement) {
      el.parentNode = this as any;
      this.el = el;
    }
    // no-op
  }

  removeChild(el: NSVNode) {
    // console.log('NSVRoot->removeCchild()');
    if (el === this.el) {
      this.el = null;
    }
  }

  insertBefore(el: NSVNode, anchor?: NSVNode | null) {
    // console.error(
    //   "insertBefore called on NSVRoot - root element must contain a single child."
    // );
    return this.appendChild(el);
  }
}

function addChild(child: NSVElement, parent: NSVElement, atIndex?: number) {
  if (__TEST__) return;
  // debug(
  //   `...addChild(  ${child.tagName}(${child.nodeId}), ${parent.tagName}(${
  //     parent.nodeId
  //   }), ${atIndex}  )`
  // )
  if (child.meta.viewFlags & NSVViewFlags.SKIP_ADD_TO_DOM) {
    // debug('SKIP_ADD_TO_DOM')
    return;
  }

  const parentView = parent.nativeView;
  const childView = child.nativeView;

  if (parent.meta.viewFlags & NSVViewFlags.NO_CHILDREN) {
    // debug('NO_CHILDREN')
    return;
  }
  if (parent.meta.nodeOps) {
    return parent.meta.nodeOps.insert(child, parent, atIndex);
  }

  if (parent.meta.viewFlags & NSVViewFlags.LAYOUT_VIEW) {
    if (typeof atIndex === 'number') {
      parentView.insertChild(childView, atIndex);
    } else {
      parentView.addChild(childView);
    }
  } else if (parent.meta.viewFlags & NSVViewFlags.CONTENT_VIEW) {
    parentView.content = childView;
  } else {
    parentView._addChildFromBuilder(childView.constructor.name, childView);
  }
}

function removeChild(child: NSVElement, parent: NSVElement) {
  if (__TEST__) return;
  // debug(
  //   `...removeChild(  ${child.tagName}(${child.nodeId}), ${parent.tagName}(${
  //     parent.nodeId
  //   })  )`
  // )

  if (child.meta.viewFlags & NSVViewFlags.SKIP_ADD_TO_DOM) {
    // debug('SKIP_ADD_TO_DOM')
    return;
  }
  if (parent.meta.viewFlags & NSVViewFlags.NO_CHILDREN) {
    // debug('NO_CHILDREN')
    return;
  }
  if (parent.meta.nodeOps) {
    return parent.meta.nodeOps.remove(child, parent);
  }

  const parentView = parent.nativeView;
  const childView = child.nativeView;

  if (parent.meta.viewFlags & NSVViewFlags.LAYOUT_VIEW) {
    parentView.removeChild(childView);
  } else if (parent.meta.viewFlags & NSVViewFlags.CONTENT_VIEW) {
    parentView.content = null;
  } else {
    parentView._removeView(childView);
  }
}
