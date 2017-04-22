import ViewNode from './view-node'
import {getViewClass, getViewMeta} from '../element-registry'


export default class Element extends ViewNode {
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

