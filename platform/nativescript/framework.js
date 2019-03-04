import { topmost } from 'tns-core-modules/ui/frame'
import application from 'tns-core-modules/application'
import Vue from './runtime/index'
import ModalPlugin from './plugins/modal-plugin'
import NavigatorPlugin from './plugins/navigator-plugin'

import { setVue } from './util'

Vue.config.silent = true

setVue(Vue)

Vue.use(ModalPlugin)
Vue.use(NavigatorPlugin)

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

// Fix a rollup problem which does not define
// module.export.default = Vue
// so a `import Vue from 'nativescript-vue'` will
// fail from a Typescript file
Vue.default = Vue

export default Vue
