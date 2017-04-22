import {getViewClass, getViewMeta} from '../element-registry'
import {ContentView} from 'ui/content-view'
import {LayoutBase} from 'ui/layouts/layout-base'
import {TextBase} from 'ui/text-base'

class ViewNode {

    constructor() {
        this.type = null
        this.parentNode = null
        this.nextSibling = null
        this.meta = getViewMeta('view-node')
        this.view = null
        this.elm = {}
    }

    toString() {
        return `${this.type}(${this.view ? this.view : '-'})`
    }

    setAttr(key, val) {
        try {
            this.view[key] = val
        } catch (e) {
            throw new Error(`Element ${this.type} has no property ${key}.`)
        }
    }

    addEvent(evt, handler) {
        this.view.on(evt, handler)
    }

    removeEvent(evt) {
        this.view.off(evt)
    }

    insertBefore(newNode, referenceNode) {
        let index = referenceNode ? this.view.getChildIndex(referenceNode.view) : 0
        this.appendChild(newNode, index)
    }

    setStyle(prop, val) {
        if (!(val = val.trim()).length) {
            return
        }
        if (prop.endsWith('Align')) {
            // Nativescript uses Alignment instead of Align, this ensures that text-align works
            prop += 'ment'
        }
        this.view.style[prop] = val
    }

    appendChild(child, atIndex = -1) {
        if (child.meta.skipAddToDom) {
            return
        }

        if (this.view instanceof LayoutBase) {
            if (child.parentNode === this) {
                let index = this.view.getChildIndex(child.view)

                if (index !== -1) {
                    this.removeChild(child)
                }
            }
            child.parentNode = this
            if (atIndex !== -1) {
                return this.view.insertChild(child.view, atIndex)
            }
            return this.view.addChild(child.view)
        }
        if (this.view instanceof ContentView) {
            child.parentNode = this
            if (child.type === 'comment') {
                return this.view._addView(child.view, atIndex)
            }
            return this.view.content = child.view
        }
        if ((this.view instanceof TextBase) && (child.view instanceof TextBase)) {
            child.parentNode = this
            return this.setAttr('text', child.view.text)
        }


        console.log(`Cant append child to ${this.type}`)
    }

    removeChild(child) {
        if (this.view instanceof LayoutBase) {
            child.parentNode = null
            return this.view.removeChild(child.view)
        }
        if (this.view instanceof ContentView) {
            child.parentNode = null
            return this.view.content = null
        }
    }
}

export class Document extends ViewNode {

    constructor(page) {
        super()
        this.type = 'document'
        this.view = page
        this.elm = {
            type: 'placeholder',
            parentNode: this
        }
    }

    removeChild(child) {
        // do nothing
    }

    insertBefore(newNode, referenceNode) {
        this.appendChild(newNode)
    }
}

export class Element extends ViewNode {
    constructor(type) {
        super()
        this.type = type
        this.meta = getViewMeta(type)

        try {
            const viewClass = getViewClass(type)
            this.elm = this.view = new viewClass
        } catch (e) {
            console.log(`Failed to instantiate View class for ${type}. ${e}`)
        }
    }
}

export class Comment extends ViewNode {
    constructor() {
        super()
        this.type = 'comment'

        try {
            const viewClass = getViewClass(this.type)
            this.elm = this.view = new viewClass
        } catch (e) {
            console.log(`Failed to instantiate View class for ${type}. ${e}`)
        }
    }
}