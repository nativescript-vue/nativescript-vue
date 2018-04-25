import { start, on, launchEvent } from 'tns-core-modules/application'
import { warn } from 'core/util/index'
import { patch } from './patch'
import { mountComponent } from 'core/instance/lifecycle'
import { compileToFunctions } from '../compiler/index'
import { registerElement } from '../element-registry'

import Vue from 'core/index'
import DocumentNode from '../renderer/DocumentNode'
import platformComponents from './components/index'
import platformDirectives from './directives/index'

import { mustUseProp, isReservedTag, isUnknownElement } from '../util/index'
import { ensurePage } from '../util'

export const VUE_VM_REF = '__vue_vm_ref__'

Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isUnknownElement = isUnknownElement

Vue.$document = Vue.prototype.$document = new DocumentNode()

Vue.compile = compileToFunctions
Vue.registerElement = registerElement

Object.assign(Vue.options.directives, platformDirectives)
Object.assign(Vue.options.components, platformComponents)

Vue.prototype.__patch__ = patch

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
          delimiters: options.delimiters,
          comments: options.comments
        },
        this
      )
      options.render = render
      options.staticRenderFns = staticRenderFns
    }
  }

  return mountComponent(this, el, hydrating)
}

Vue.prototype.$start = function({ getRootView }) {
  let self = this
  const AppConstructor = Vue.extend(this.$options)

  on(launchEvent, args => {
    if (self.$el) {
      self.$destroy()
      self = new AppConstructor()
    }

    self.$mount()
    args.root =
      typeof getRootView === 'function'
        ? getRootView(self)
        : ensurePage(self.$el, self)
  })

  start()
}

export default Vue
