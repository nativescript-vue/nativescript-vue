import ViewNode from './ViewNode'
import CommentNode from './CommentNode'
import ElementNode from './ElementNode'
import TextNode from './TextNode'

export default class DocumentNode extends ViewNode {
  constructor() {
    super()

    this.nodeType = 9
    this.documentElement = new ElementNode('document')

    // make static methods accessible via this
    this.createComment = this.constructor.createComment
    this.createElement = this.constructor.createElement
    this.createElementNS = this.constructor.createElementNS
    this.createTextNode = this.constructor.createTextNode
  }

  static createComment(text) {
    return new CommentNode(text)
  }

  static createElement(tagName) {
    return new ElementNode(tagName)
  }

  static createElementNS(namespace, tagName) {
    return new ElementNode(namespace + ':' + tagName)
  }

  static createTextNode(text) {
    return new TextNode(text)
  }
}
