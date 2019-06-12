import { warn } from 'core/util/index'
import { patch } from './patch'
import { mountComponent } from 'core/instance/lifecycle'
import { compileToFunctions } from '../compiler/index'
import { mustUseProp, isReservedTag, isUnknownElement } from '../util/index'
import { registerElement, getElementMap } from '../element-registry'

import Vue from 'core/index'
import DocumentNode from '../renderer/DocumentNode'
import platformDirectives from './directives/index'

Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isUnknownElement = isUnknownElement

Vue.$document = Vue.prototype.$document = new DocumentNode()

Vue.compile = compileToFunctions
Vue.registerElement = registerElement

Object.assign(Vue.options.directives, platformDirectives)

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

Vue.prototype.$start = function() {
  const application = require('tns-core-modules/application')
  let self = this
  const AppConstructor = Vue.extend(this.$options)

  // register NS components into Vue
  Object.values(getElementMap()).forEach(entry => {
    Vue.component(entry.meta.component.name, entry.meta.component)
  })

  application.on(application.launchEvent, args => {
    if (self.$el) {
      self.$destroy()
      self = new AppConstructor()
    }

    self.$mount()
    args.root = self.$el.nativeView
  })

  application.run()
}

// Define a `nativeView` getter in every NS vue instance
Object.defineProperty(Vue.prototype, 'nativeView', {
  get() {
    return this.$el.nativeView
  }
})

export default Vue
