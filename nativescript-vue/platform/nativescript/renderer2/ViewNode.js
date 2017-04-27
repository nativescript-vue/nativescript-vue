const XML_ATTRIBUTES = Object.freeze(['style', 'rows', 'columns', 'fontAttributes'])

export class ViewNode {

    constructor() {
        this.name = null
        this.nodeType = null
        this.tagName = null
        this.parentNode = null
        this.childNodes = []
        this.prevSibling = null
        this.nextSibling = null
        this.ownerDocument = null

        this._nativeView = null
    }

    get firstChild() {
        return this.childNodes.length ? this.childNodes[0] : null
    }

    get lastChild() {
        return this.childNodes.length ? this.childNodes[this.childNodes.length - 1] : null
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

    /* istanbul ignore next */
    setAttribute(key, value) {
        try {
            if (XML_ATTRIBUTES.indexOf(key) !== -1) {
                this.getNativeView()._applyXmlAttribute(key, value)
            } else {
                this.getNativeView()[key] = value
            }
        } catch (e) {
            throw new Error(`${this.tagName} has no property ${key}.`)
        }

    }

    /* istanbul ignore next */
    setText(text) {
        if (this.tagName === 'detached-text') {
            this.parentNode.setText(text)
        } else {
            this.setAttribute('text', text)
        }
    }

    insertBefore(childNode, referenceNode) {
        if (!childNode) {
            throw new Error(`Can't insert child.`)
        }

        if (referenceNode && referenceNode.parentNode !== this) {
            throw new Error(`Can't insert child, because the reference node has a different parent.`)
        }

        if (childNode.parentNode && childNode.parentNode !== this) {
            throw new Error(`Can't insert child, because it already has a different parent.`)
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
    }

    appendChild(childNode) {
        if (!childNode) {
            throw new Error(`Can't append child.`)
        }

        if (childNode.parentNode && childNode.parentNode !== this) {
            throw new Error(`Can't append child, because it already has a different parent.`)
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
    }
}