import Vue from 'core/index'
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

Vue.prototype.$mount = function (el, hydrating) {
    return mountComponent(this)
}

export default Vue