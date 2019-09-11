import { normalizeElementName } from '../../element-registry'
import { addAttr } from 'compiler/helpers'

function preTransformNode(el) {
  if (el.tag !== 'router-view') return
  if (
    el.parent &&
    el.parent.tag &&
    normalizeElementName(el.parent.tag) === 'nativeframe'
  ) {
    addAttr(el.parent, 'hasRouterView', 'true')
  }
}

export default {
  preTransformNode
}
