import ViewNode from './ViewNode'
import { getViewClass } from '../element-registry'

export const VUE_ELEMENT_REF = '__vue_element_ref__'

export default class ElementNode extends ViewNode {
  constructor(tagName) {
    super()

    this.nodeType = 1
    this.tagName = tagName

    const viewClass = getViewClass(tagName)
    this._nativeView = new viewClass()
    this._nativeView[VUE_ELEMENT_REF] = this
  }

  appendChild(childNode) {
    super.appendChild(childNode)

    if (childNode.nodeType === 3) {
      this.setText(childNode.text)
    }
  }

  insertBefore(childNode, referenceNode) {
    super.insertBefore(childNode, referenceNode)

    if (childNode.nodeType === 3) {
      this.setText(childNode.text)
    }
  }

  removeChild(childNode) {
    super.removeChild(childNode)

    if (childNode.nodeType === 3) {
      this.setText('')
    }
  }
}
