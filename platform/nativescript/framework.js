// This is required because some of the third party plugins rely on this
// and cause errors since there is no process variable in {N}.
global.process = global.process || {}
global.process.env = global.process.env || {}

import inspect from 'util-inspect'
import { topmost } from 'tns-core-modules/ui/frame'
import application from 'tns-core-modules/application'
import Vue from './runtime/index'
import ModalPlugin from './plugins/modal-plugin'
import NavigatorPlugin from './plugins/navigator-plugin'
import mode from './plugins/router-plugin'

import { setVue } from './util'

Vue.config.silent = true

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

console.keys = function(object) {
  console.log(Object.keys(object))
}

// this fixes the issue of resuming the application
// however this might not be the desired functionality
// Todo: figure out if there is a better way to fix application resume.
// application.on(application.exitEvent, () => {
//   const frame = topmost()
//   if (frame) {
//     frame.eachChildView(child => {
//       const vm = child[VUE_VM_REF]
//
//       if (vm) {
//         console.log('DESTROYING ON APPEXITEVENT...')
//         vm.$destroy()
//       }
//       frame._removeView(child)
//     })
//   }
// })

global.__onLiveSyncCore = () => {
  const frame = topmost()
  if (frame) {
    if (frame.currentPage && frame.currentPage.modal) {
      frame.currentPage.modal.closeModal()
    }

    if (frame.currentPage) {
      frame.currentPage.addCssFile(application.getCssFileName())
    }
  }
}

Object.assign(Vue, {
  Vue,
  mode
})

export default Vue
