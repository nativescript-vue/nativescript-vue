console.keys = function (object) {
    console.dir(Object.keys(object))
}

import Vue from './runtime/index'
import ModalPlugin from './modal-plugin'

Vue.use(ModalPlugin)

export default Vue
