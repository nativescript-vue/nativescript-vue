import * as nodeOps from './node-ops'
import {createPatchFunction} from "core/vdom/patch"
import baseModules from 'core/vdom/modules/index'


const modules = [].concat(baseModules)

export const patch = createPatchFunction({
    nodeOps,
    modules
})