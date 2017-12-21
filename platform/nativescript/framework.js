import inspect from 'util-inspect'

console.log = (function(log, inspect) {
  return function() {
    return log.apply(
      this,
      Array.prototype.map.call(arguments, function(arg) {
        return inspect(arg, { depth: 1, colors: true })
      })
    )
  }
})(console.log, inspect)

console.keys = function(object) {
  console.log(Object.keys(object))
}

// This is required because some of the third party plugins rely on this
// and cause errors since there is no process variable in {N}.
global.process = global.process || {}
global.process.env = global.process.env || {}

import Vue from './runtime/index'
import ModalPlugin from './plugins/modal-plugin'
import NavigatorPlugin from './plugins/navigator-plugin'
// import DecoderPlugin from './plugins/decoder-plugin'
import RouterPlugin from './plugins/router-plugin'

Vue.use(ModalPlugin)
Vue.use(NavigatorPlugin)
// Vue.use(DecoderPlugin)
Vue.use(RouterPlugin)

export default Vue
