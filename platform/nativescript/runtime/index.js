import { start } from 'application'
import { warn } from 'core/util/index'
import { patch } from './patch'
import { mountComponent } from 'core/instance/lifecycle'
import { compileToFunctions } from '../compiler/index'
import { registerElement } from '../element-registry'
import { isPage } from '../util/index'
import { Page } from 'ui/page'

import Vue from 'core/index'
import DocumentNode from '../renderer/DocumentNode'
import platformComponents from './components/index'
import platformDirectives from './directives/index'

import { mustUseProp, isReservedTag, isUnknownElement } from '../util/index'

export const VUE_VM_REF = '__vue_vm_ref__'

Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isUnknownElement = isUnknownElement

Vue.$document = Vue.prototype.$document = new DocumentNode()

Vue.registerElement = registerElement

Vue.options.directives = platformDirectives
Vue.options.components = platformComponents

Vue.prototype.__patch__ = patch

Vue.prototype.$start = function() {
  this.__is_root__ = true
  this.__started__ = true

  const placeholder = this.$document.createComment('placeholder')

  const vm = this.$mount(placeholder)

  this.$navigateTo(vm, { clearHistory: true })
}

const mount = function(el, hydrating) {
  return mountComponent(this, el, hydrating)
}

Vue.prototype.$mount = function(el, hydrating) {
  const options = this.$options
  // resolve template/el and convert to render function
  if (!options.render) {
    let template = options.template
    if (template && typeof template !== 'string') {
      warn('invalid template option: ' + template, this)
      return this
    }

    if (template) {
      const { render, staticRenderFns } = compileToFunctions(
        template,
        {
          delimiters: options.delimiters
        },
        this
      )
      options.render = render
      options.staticRenderFns = staticRenderFns
    }
  }
  return mount.call(this, el, hydrating)
}

Vue.prototype.$renderTemplate = function(template, context, oldVnode) {
  let slot = template
  if (typeof template !== 'function') {
    slot = this.$scopedSlots[template]
      ? this.$scopedSlots[template]
      : this.$scopedSlots.default
  }

  let vnode = slot(context)[0]
  this.__patch__(oldVnode, vnode)

  return vnode
}

export default Vue
