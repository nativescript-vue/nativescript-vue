import ViewNode from './view-node'
import {getViewClass, getViewMeta} from '../element-registry'

export default class Document extends ViewNode {

    constructor(page) {
        super()
        this.type = 'document'
        this.view = page
        let plView
        try {
            const viewClass = getViewClass('detached-container')
            plView = new viewClass
        } catch (e) {
            console.log(`Failed to instantiate View class for ${type}. ${e}`)
        }
        this.elm = {
            toString: () => 'placeholder',
            type: 'placeholder',
            view: plView,
            elm: plView,
            parentNode: () => this,
            nextSibling: () => null
        }
    }

    insertBefore(newNode, referenceNode) {
        this.appendChild(newNode)
    }

    removeChild(child) {
        // do nothing
    }
}
