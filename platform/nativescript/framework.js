// This is required because some of the third party plugins rely on this
// and cause errors since there is no process variable in {N}.
global.process = global.process || {}
global.process.env = global.process.env || {}

import { VUE_VM_REF } from './runtime'
import inspect from 'util-inspect'
import { topmost } from 'ui/frame'
import application from 'application'
import Vue from './runtime/index'
import ModalPlugin from './plugins/modal-plugin'
import NavigatorPlugin from './plugins/navigator-plugin'
// import DecoderPlugin from './plugins/decoder-plugin'
import RouterPlugin from './plugins/router-plugin'

Vue.use(ModalPlugin)
Vue.use(NavigatorPlugin)
// Vue.use(DecoderPlugin)
Vue.use(RouterPlugin)

console.log = (function(log, inspect, Vue) {
  return function() {
    return log.apply(
      this,
      Array.prototype.map.call(arguments, function(arg) {
        return inspect(arg, { depth: 1, colors: Vue.config.debug })
      })
    )
  }
})(console.log, inspect, Vue)

console.keys = function(object) {
  console.log(Object.keys(object))
}

// this fixes the issue of resuming the application
// however this might not be the desired functionality
// Todo: figure out if there is a better way to fix application resume.
application.on(application.exitEvent, () => {
  const frame = topmost()
  if (frame) {
    console.log(frame)
    frame.eachChildView(child => {
      console.log('found child')
      const vm = child[VUE_VM_REF]

      if (vm) {
        vm.$destroy()
      }
      frame._removeView(child)
    })
  }
})

export default Vue
