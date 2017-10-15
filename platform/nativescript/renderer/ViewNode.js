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

  /* istanbul ignore next */
  setAttribute(key, value) {
    try {
      if (XML_ATTRIBUTES.indexOf(key) !== -1) {
        this.nativeView._applyXmlAttribute(key, value)
      } else {
        this.nativeView[key] = value
      }
    } catch (e) {
      throw new Error(`${this.tagName} has no property ${key}. (${e})`)
    }
  }

  /* istanbul ignore next */
  setStyle(property, value) {
    if (!(value = value.trim()).length) {
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

    if (referenceNode && referenceNode.parentNode !== this) {
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
      throw new Error(`Can't insert child, because it is already a child.`)
    }

    let index = this.childNodes.indexOf(referenceNode)

    childNode.parentNode = this
    childNode.nextSibling = referenceNode
    childNode.prevSibling = this.childNodes[index - 1]

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

    if (childNode.parentNode === this) {
      throw new Error(`Can't append child, because it is already a child.`)
    }

    childNode.parentNode = this

    if (this.lastChild) {
      childNode.prevSibling = this.lastChild
      this.lastChild.nextSibling = childNode
    }

    this.childNodes.push(childNode)

    viewUtil.insertChild(this, childNode, this.childNodes.length - 1)
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

    this.childNodes = this.childNodes.filter(node => node !== childNode)

    viewUtil.removeChild(this, childNode)
  }
}
