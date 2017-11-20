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

  const placeholder = this.$document.createComment('placeholder')

  this.$mount(placeholder)
}

const mount = function(el, hydrating) {
  if (this.__is_root__ && !this.__started__) {
    const self = this
    start({
      create() {
        // Call mountComponent in the create callback when the IOS app loop has started
        // https://github.com/rigor789/nativescript-vue/issues/24
        mountComponent(self, el, hydrating)
        self.__started__ = true

        const page = isPage(self.$el) ? self.$el.nativeView : new Page()

        if (!isPage(self.$el)) {
          page.content = self.$el.nativeView
        }

        return page
      }
    })
  } else {
    mountComponent(this, el, hydrating)
  }
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
