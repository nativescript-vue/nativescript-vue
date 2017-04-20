import {getViewClass, getViewMeta} from '../element-registry'

class ViewNode {

    constructor() {
        this.type = null
        this.parentNode = null
        this.nextSibling = null
        this.meta = getViewMeta('view-node')
        this.view = null
        this.elm = {}
    }

    setAttr(key, val) {
        console.log(`setAttr on ${this.type} [${this.view._domId}]: ${key} = ${val}`)
        try {
            this.view[key] = val
        } catch (e) {
            throw new Error(`Element ${this.type} has no property ${key}.`)
        }
    }

    hasAttribute() {
        console.log('hasAttribute')
    }

    setAttribute() {
        console.log('setAttribute')
    }

    insertBefore() {
        // Todo
        console.log('[Element] insertBefore')
    }

    appendChild(child) {
        console.log('[Element] appendChild ' + this.type)
        if (child.meta.skipAddToDom) {
            console.log('skipping adding to dom')
            return
        }

        if ('addChild' in this.view) {
            return this.view.addChild(child.view)
        }

        throw new Error(`Cant append child to ${this.type}`)
    }

    removeChild() {
        console.log('[Element] removeChild')
    }
}

export class Document extends ViewNode {

    constructor(page) {
        super()
        this.type = 'document'
        this.view = page
        this.elm = {
            parentNode: this
        }

        console.log('Created new Document element.')
    }

    appendChild(node) {
        console.log('[Document] appendChild ' + node.type)
        this.view.content = node.view
    }
}

export class Element extends ViewNode {
    constructor(type) {
        super()
        console.log('Element constructor for', type)

        this.type = type
        this.meta = getViewMeta(type)

        try {
            const viewClass = getViewClass(type)
            this.elm = this.view = new viewClass
        } catch (e) {
            console.log(`Failed to instantiate View class for ${type}. ${e}`)
        }

        console.log('Element object ' + type)
    }
}

export class Comment extends ViewNode {
    constructor() {
        super()
        this.type = 'comment'
        this.meta.skipAddToDom = true
    }
}