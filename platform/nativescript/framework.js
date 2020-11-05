import Vue from './runtime/index'
import ModalPlugin from './plugins/modal-plugin'
import NavigatorPlugin from './plugins/navigator-plugin'

import { setVue } from './util'

Vue.config.silent = true
Vue.config.suppressRenderLogs = false

setVue(Vue)

Vue.use(ModalPlugin)
Vue.use(NavigatorPlugin)

global.__onLiveSyncCore = () => {
  const frame = require('@nativescript/core').Frame.topmost()
  if (frame) {
    if (frame.currentPage && frame.currentPage.modal) {
      frame.currentPage.modal.closeModal()
    }

    if (frame.currentPage) {
      frame.currentPage.addCssFile(
        require('@nativescript/core').Application.getCssFileName()
      )
    }
  }
}

// Fix a rollup problem which does not define
// module.export.default = Vue
// so a `import Vue from 'nativescript-vue'` will
// fail from a Typescript file
// Vue.default = Vue

export default Vue
