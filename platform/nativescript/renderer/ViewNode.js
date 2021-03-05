import set from 'set-value'

import { getViewMeta, normalizeElementName } from '../element-registry'
import * as viewUtil from './utils'

const XML_ATTRIBUTES = Object.freeze([
  'style',
  'rows',
  'columns',
  'fontAttributes'
])

export default class ViewNode {
  constructor() {
    this.nodeType = null
    this._tagName = null
    this.parentNode = null
    this.childNodes = []
    this.prevSibling = null
    this.nextSibling = null

    this._ownerDocument = null
    this._nativeView = null
    this._meta = null

    /* istanbul ignore next
     * make vue happy :)
     */
    this.hasAttribute = this.removeAttribute = () => false
  }

  /* istanbul ignore next */
  toString() {
    return `${this.constructor.name}(${this.tagName})`
  }

  set tagName(name) {
    this._tagName = normalizeElementName(name)
  }

  get tagName() {
    return this._tagName
  }

  get firstChild() {
    return this.childNodes.length ? this.childNodes[0] : null
  }

  get lastChild() {
    return this.childNodes.length
      ? this.childNodes[this.childNodes.length - 1]
      : null
  }

  get nativeView() {
    return this._nativeView
  }

  set nativeView(view) {
    if (this._nativeView) {
      throw new Error(`Can't override native view.`)
    }

    this._nativeView = view
  }

  get meta() {
    if (this._meta) {
      return this._meta
    }

    return (this._meta = getViewMeta(this.tagName))
  }

  /* istanbul ignore next */
  get ownerDocument() {
    if (this._ownerDocument) {
      return this._ownerDocument
    }

    let el = this
    while ((el = el.parentNode).nodeType !== 9) {
      // do nothing
    }

    return (this._ownerDocument = el)
  }

  getAttribute(key) {
    return this.nativeView[key]
  }

  /* istanbul ignore next */
  setAttribute(key, value) {
    const isAndroid = global.isAndroid
    const isIOS = global.isIOS
    const nv = this.nativeView

    try {
      if (XML_ATTRIBUTES.indexOf(key) !== -1) {
        nv[key] = value
      } else {
        // detect expandable attrs for boolean values
        // See https://vuejs.org/v2/guide/components-props.html#Passing-a-Boolean
        if (
          require('@nativescript/core').Utils.isBoolean(nv[key]) &&
          value === ''
        ) {
          value = true
        }

        if (isAndroid && key.startsWith('android:')) {
          set(nv, key.substr(8), value)
        } else if (isIOS && key.startsWith('ios:')) {
          set(nv, key.substr(4), value)
        } else if (key.endsWith('.decode')) {
          set(
            nv,
            key.slice(0, -7),
            require('@nativescript/core').XmlParser._dereferenceEntities(value)
          )
        } else {
          set(nv, key, value)
        }
      }
    } catch (e) {
      // ignore
    }
  }

  /* istanbul ignore next */
  setStyle(property, value) {
    if (!value || !(value = value.trim()).length) {
      return
    }

    if (property.endsWith('Align')) {
      // NativeScript uses Alignment instead of Align, this ensures that text-align works
      property += 'ment'
    }
    this.nativeView.style[property] = value
  }

  /* istanbul ignore next */
  setText(text) {
    if (this.nodeType === 3) {
      this.parentNode.setText(text)
    } else {
      this.setAttribute('text', text)
    }
  }

  /* istanbul ignore next */
  addEventListener(event, handler) {
    this.nativeView.on(event, handler)
  }

  /* istanbul ignore next */
  removeEventListener(event) {
    this.nativeView.off(event)
  }

  insertBefore(childNode, referenceNode) {
    if (!childNode) {
      throw new Error(`Can't insert child.`)
    }

    if (
      referenceNode &&
      referenceNode.parentNode &&
      referenceNode.parentNode !== this
    ) {
      throw new Error(
        `Can't insert child, because the reference node has a different parent.`
      )
    }

    if (childNode.parentNode && childNode.parentNode !== this) {
      throw new Error(
        `Can't insert child, because it already has a different parent.`
      )
    }

    if (childNode.parentNode === this) {
      // in case the childNode is already a child node of this view
      // we need to first remove it to clean up childNodes, parentNode, prev/next siblings
      // we are adding back the child right after - this is often the case when the order
      // of children has to change (including comment nodes created by vue)
      // fixes #608
      this.removeChild(childNode)
      // we don't need to throw an error here, because it is a valid case
      // for example when switching the order of elements in the tree
      // fixes #127 - see for more details
      // fixes #240
      // throw new Error(`Can't insert child, because it is already a child.`)
    }

    // in some rare cases insertBefore is called with a null referenceNode
    // this makes sure that it get's appended as the last child
    if (!referenceNode) {
      return this.appendChild(childNode)
    }

    let index = this.childNodes.indexOf(referenceNode)

    childNode.parentNode = this
    childNode.nextSibling = referenceNode
    childNode.prevSibling = this.childNodes[index - 1]
    if (childNode.prevSibling) childNode.prevSibling.nextSibling = childNode

    referenceNode.prevSibling = childNode
    this.childNodes.splice(index, 0, childNode)

    viewUtil.insertChild(this, childNode, index)
  }

  appendChild(childNode) {
    if (!childNode) {
      throw new Error(`Can't append child.`)
    }

    if (childNode.parentNode && childNode.parentNode !== this) {
      throw new Error(
        `Can't append child, because it already has a different parent.`
      )
    }

    childNode.parentNode = this
    if (this.lastChild) {
      childNode.prevSibling = this.lastChild
      this.lastChild.nextSibling = childNode
    }

    this.childNodes.push(childNode)

    viewUtil.insertChild(this, childNode)
  }

  removeChild(childNode) {
    if (!childNode) {
      throw new Error(`Can't remove child.`)
    }

    if (!childNode.parentNode) {
      throw new Error(`Can't remove child, because it has no parent.`)
    }

    if (childNode.parentNode !== this) {
      throw new Error(`Can't remove child, because it has a different parent.`)
    }

    childNode.parentNode = null

    if (childNode.prevSibling) {
      childNode.prevSibling.nextSibling = childNode.nextSibling
    }

    if (childNode.nextSibling) {
      childNode.nextSibling.prevSibling = childNode.prevSibling
    }

    // reset the prevSibling and nextSibling. If not, a keep-alived component will
    // still have a filled nextSibling attribute so vue will not
    // insert the node again to the parent. See #220
    childNode.prevSibling = null
    childNode.nextSibling = null

    this.childNodes = this.childNodes.filter(node => node !== childNode)

    viewUtil.removeChild(this, childNode)
  }
}
