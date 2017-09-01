import ElementNode from './ElementNode'

export default class TextNode extends ElementNode {
  constructor(text) {
    super('comment')

    this.nodeType = 8
    this.text = text
  }
}
