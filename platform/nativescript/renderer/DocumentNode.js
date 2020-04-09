import CommentNode from './CommentNode'
import ElementNode from './ElementNode'
import ViewNode from './ViewNode'
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
    try {
      return new CommentNode(text)
    } catch (err) {
      console.log(err)
    }
  }

  static createElement(tagName) {
    try {
      return new ElementNode(tagName)
    } catch (err) {
      console.log(err)
    }
  }

  static createElementNS(namespace, tagName) {
    try {
      return new ElementNode(namespace + ':' + tagName)
    } catch (err) {
      console.log(err)
    }
  }

  static createTextNode(text) {
    try {
      return new TextNode(text)
    } catch (err) {
      console.log(err)
    }
  }
}
