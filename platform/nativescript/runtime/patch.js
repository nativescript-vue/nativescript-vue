import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'

import platformModules from './modules/index'
import * as nodeOps from './node-ops'

const modules = platformModules.concat(baseModules)

export const patch = createPatchFunction({
  nodeOps,
  modules
})
