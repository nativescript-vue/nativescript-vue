import Vue from './runtime/index'

const renderer = {}

export function init(cfg) {
    renderer.Document = cfg.Document
    renderer.Element = cfg.Element
    renderer.Comment = cfg.Comment

    Vue.renderer = renderer
    Vue.setDocument = (view) => {
        Vue.prototype.$document = new renderer.Document(view)
    }

    return Vue
}

