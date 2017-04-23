import Comment from './comment'
import ViewNode from './view-node'
import {getViewClass} from '../element-registry'
import {start} from 'application'

export default class Document extends ViewNode {

    constructor() {
        super()
        this.type = 'document'
        try {
            const viewClass = getViewClass('detached-container')
            this.view = new viewClass
        } catch (e) {
            console.log(`Failed to instantiate View class for detached-container in ${this}. ${e}`)
        }

        // append placeholder, which will get replaced by initial $mount
        this.isRootElement = true
        this.placeholder = new Comment()
        this.appendChild(this.placeholder)
    }

    getRootView() {
        return this.placeholder
    }

    hasNonPlaceholderChild(view) {
        let found = false
        view.eachChild(child => {
            if (child.typeName.toLowerCase() !== 'placeholder') {
                found = true
            }
        })

        return found
    }

    insertBefore(newNode, referenceNode) {
        if (this.hasNonPlaceholderChild(this.view)) {
            throw new Error(`only one root is allowed.`)
        }
        if (newNode.type !== 'page') {
            throw new Error(`root node must be <page>. <${newNode.type}> given.`)
        }

        if (this.isRootElement) {
            this.isRootElement = false
            this.placeholder = newNode
        }

        start({
            create() {
                return newNode.view
            }
        })
    }
}
