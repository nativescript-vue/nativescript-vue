import ViewNode from './view-node'
import {getViewClass, getViewMeta} from '../element-registry'


export default class Comment extends ViewNode {
    constructor() {
        super()
        this.type = 'comment'
        this.meta = getViewMeta(this.type)

        try {
            const viewClass = getViewClass(this.type)
            this.elm = this.view = new viewClass
        } catch (e) {
            console.log(`Failed to instantiate View class for ${this.type}. ${e}`)
        }
    }
}