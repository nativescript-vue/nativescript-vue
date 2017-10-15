console.keys = function(object) {
  console.dir(Object.keys(object))
}

import Vue from './runtime/index'
import ModalPlugin from './modal-plugin'
import NavigatorPlugin from './navigator-plugin'
import DecoderPlugin from './decoder-plugin'

Vue.use(ModalPlugin)
Vue.use(NavigatorPlugin)
Vue.use(DecoderPlugin)

export default Vue
