import {init as initVue} from './platform/nativescript/framework'
import {Document, Element, Comment} from './platform/nativescript/renderer/index'

export default initVue({
    Document,
    Element,
    Comment,
})

