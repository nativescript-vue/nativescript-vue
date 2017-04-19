import * as nodeOps from './node-ops'
import {createPatchFunction} from "core/vdom/patch"
import attrs from './modules/attrs'
import baseModules from 'core/vdom/modules/index'


const modules = [attrs].concat(baseModules)

export const patch = createPatchFunction({
    nodeOps,
    modules
})