import * as nodeOps from './node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import platformModules from './modules/index'
import baseModules from 'core/vdom/modules/index'

const modules = platformModules.concat(baseModules)

export const patch = createPatchFunction({
  nodeOps,
  modules
})
