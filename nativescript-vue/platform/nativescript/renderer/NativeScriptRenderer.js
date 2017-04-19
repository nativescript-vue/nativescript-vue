import Renderer from "./index";
import {getViewClass, getViewMeta} from '../../../element-registry'

export class Document  {

    constructor(page) {
        this.view = page
    }
}

export class Element {

    constructor(type) {
        console.log('Element constructor for', type)

        this.type = type
        this.parentNode = null
        this.nextSibling = null
        this.meta = getViewMeta(type)

        const viewClass = getViewClass(type)
        this.view = new viewClass

        console.log('Element object ' + type)
    }

    setAttr(key, val) {
        console.log(`setAttr on ${this.type} [${this.view._domId}]: ${key} = ${val}`)
        if (!(key in this.view)) {
            throw new Error(`Element ${this.type} has no property ${key}.`)
        }

        this.view[key] = val
    }

    insertBefore() {
        // Todo
    }

    appendChild() {
        // Todo
    }

    removeChild() {
        // Todo
    }
}
export class Comment {
}