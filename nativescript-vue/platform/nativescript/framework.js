import Vue from './runtime/index'
import {registerElement} from './element-registry'

const renderer = {}

export function init(cfg) {
    renderer.Document = cfg.Document
    renderer.Element = cfg.Element
    renderer.Comment = cfg.Comment

    Vue.renderer = renderer
    Vue.prototype.$document = new renderer.Document()
    Vue.registerElement = registerElement

    return Vue
}

