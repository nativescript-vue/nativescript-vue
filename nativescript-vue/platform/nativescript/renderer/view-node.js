import {getViewMeta} from '../element-registry'
import {ContentView} from 'ui/content-view'
import {LayoutBase} from 'ui/layouts/layout-base'

import {isView, isLayout, isContentView, isTextView} from './util'

export default class ViewNode {

    constructor() {
        this.type = null
        this.parent = null
        this.meta = getViewMeta('view-node')
        this.view = null
        this.elm = {}
    }

    toString() {
        return `${this.type}(${this.view ? this.view : '-'})`
    }

    parentNode() {
        return this.parent
    }

    nextSibling(node) {
        let index = 0;
        let found = false;
        this.view.eachChild(child => {
            if (child === node.view) {
                found = true;
            }

            index += 1;
            return !found;
        });

        return found ? index : -1;
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
        console.log(`{NSR} -> ${this}.setStyle(${prop}, ${val})`)
        if (!(val = val.trim()).length) {
            return
        }
        if (prop.endsWith('Align')) {
            // NativeScript uses Alignment instead of Align, this ensures that text-align works
            prop += 'ment'
        }
        this.view.style[prop] = val
    }

    appendChild(child, atIndex = -1) {
        child.parent = this
        if (isLayout(this.view)) {
            if (child.view.parent === this.view) {
                let index = this.view.getChildIndex(child.view)

                if (index !== -1) {
                    this.removeChild(child)
                }
            }
            if (atIndex !== -1) {
                this.view.insertChild(child.view, atIndex)
            } else {
                this.view.addChild(child.view)
            }
        } else if (isContentView(this.view)) {
            if (child.type === 'comment') {
                this.view._addView(child.view, atIndex)
            } else {
                this.view.content = child.view
            }
        } else if (isTextView(this.view)) {
            child.view.parent = this.view
            this.setAttr('text', child.view.text)
        } else {
            child.parent = null
            console.log(`Cant append child to ${this.type}`)
        }
    }

    removeChild(child) {
        let childParent = child.parent
        child.parent = null
        if (isLayout(this.view)) {
            this.view.removeChild(child.view)
        } else if (isContentView(this.view)) {
            if (this.view.content === child.view.content) {
                this.view.content = null
            }

            if (child.type === 'comment') {
                this.view._removeView(child.view)
            }
        } else if (isView(this.view)) {
            this.view._removeView(child.view)
        } else {
            child.parent = childParent
            console.log(`Cant remove child from ${this.type}`)
        }
    }
}
