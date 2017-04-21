import Vue from 'core/index'
import {warn} from 'core/util/index'
import {compileToFunctions} from '../compiler/index'
import {patch} from './patch'
import {mountComponent} from 'core/instance/lifecycle'

import {
    query,
    mustUseProp,
    isReservedTag,
    isUnknownElement
} from '../util/index'

Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isUnknownElement = isUnknownElement

//Vue.options.directives = platformDirectives
//Vue.options.components = platformComponents

Vue.prototype.__patch__ = patch

const mount = function (el, hydrating) {
    mountComponent(this, this.$document, hydrating)
}

Vue.prototype.$mount = function (el, hydrating) {
    const options = this.$options
    // resolve template/el and convert to render function
    if (!options.render) {
        let template = options.template
        if (template && typeof template !== 'string') {
            warn('invalid template option: ' + template, this)
            return this
        }

        if (template) {
            const {render, staticRenderFns} = compileToFunctions(template, {
                delimiters: options.delimiters
            }, this)
            options.render = render
            options.staticRenderFns = staticRenderFns
        }
    }
    return mount.call(this, el, hydrating)
}

export default Vue