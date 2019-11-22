import inspect from 'util-inspect'
import Vue from './runtime/index'
import ModalPlugin from './plugins/modal-plugin'
import NavigatorPlugin from './plugins/navigator-plugin'

import { setVue } from './util'

Vue.config.silent = true
Vue.config.suppressRenderLogs = false

setVue(Vue)

Vue.use(ModalPlugin)
Vue.use(NavigatorPlugin)

const newLineRegExp = /\\n/g

console.log = (function(log, inspect, Vue) {
  return function(...args) {
    return log.call(
      this,
      ...Array.prototype.map.call(args, function(arg) {
        return inspect(arg, {
          depth: 2,
          colors: Vue.config.debug,
          showHidden: true
        }).replace(newLineRegExp, '\n')
      })
    )
  }
})(console.log, inspect, Vue)

global.__onLiveSyncCore = () => {
  const frame = require('tns-core-modules/ui/frame').topmost()
  if (frame) {
    if (frame.currentPage && frame.currentPage.modal) {
      frame.currentPage.modal.closeModal()
    }

    if (frame.currentPage) {
      frame.currentPage.addCssFile(
        require('tns-core-modules/application').getCssFileName()
      )
    }
  }
}

// Fix a rollup problem which does not define
// module.export.default = Vue
// so a `import Vue from 'nativescript-vue'` will
// fail from a Typescript file
Vue.default = Vue

export default Vue
