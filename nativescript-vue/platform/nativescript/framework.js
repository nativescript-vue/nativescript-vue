import TextNode from './runtime/text-node'
import Vue from './runtime/index'

const modules = {}
const components = {}

const renderer = {
    TextNode,
    modules,
    components
}

export function init(cfg) {
    renderer.Document = cfg.Document
    renderer.Element = cfg.Element
    renderer.Comment = cfg.Comment

    Vue.renderer = renderer
    Vue.prototype.$document = new renderer.Document

    return Vue
}

