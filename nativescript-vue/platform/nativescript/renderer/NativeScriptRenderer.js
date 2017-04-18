import Renderer from "./index";
import VNode from 'core/vdom/vnode'

const elementTypes = {}

let nextNodeRef = 1
function uniqueId() {
    return (nextNodeRef++).toString()
}

export class NativeScriptRenderer extends Renderer {
    constructor() {
        super()

        console.log('NativeScriptRenderer constructed')
    }
}

export class Document {
    constructor() {
        console.log('new document')

        this.nodeMap = {}
        this.createDocumentElement()
    }

    createDocumentElement() {
        if (!this.documentElement) {
            const el = new Element('document')
            el.role = 'documentElement'
            el.depth = 0
            el.ref = '_documentElement'
            this.nodeMap._documentElement = el
            this.documentElement = el
        }

        return this.documentElement
    }

    createBody(type, props) {
        if (!this.body) {
            const el = new Element(type, props)
            setBody(this, el)
        }

        return this.body
    }

    createElement(tagName, props) {
        return new Element(tagName, props)
    }

    createComment(text) {
        return new Comment(text)
    }
}

const DEFAULT_TAG_NAME = 'label'

export class Element extends VNode {
    constructor(type = DEFAULT_TAG_NAME, props, isExtended) {
        super(type, props)
        const XElement = elementTypes[type]
        if (XElement && !isExtended) {
            return new XElement(props)
        }
        props = props || {}
        this.nodeType = 1
        this.nodeId = uniqueId()
        this.ref = this.nodeId
        this.type = type
        this.attr = props.attr || {}
        this.style = props.style || {}
        this.classStyle = props.classStyle || {}
        this.event = {}
        this.children = []
        this.pureChildren = []
    }

    setAttr(key, value) {
        if (this.attr[key] === value) {
            return
        }

        this.attr[key] = value
    }

    appendChild(node) {
        if (node.parentNode && node.parentNode !== this) {
            return
        }

        if (!node.parentNode) {
            node.parentNode = this
            this.children.push(node)
        }
    }
}
export class Comment {
}