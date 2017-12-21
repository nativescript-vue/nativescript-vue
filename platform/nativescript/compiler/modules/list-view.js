import { normalizeElementName } from '../../element-registry'
import { parseFor } from 'compiler/parser/index'
import { getAndRemoveAttr, addRawAttr } from 'compiler/helpers'

function preTransformNode(el) {
  if (normalizeElementName(el.tag) !== 'listview') {
    return
  }
  const exp = getAndRemoveAttr(el, 'for')
  if (!exp) return

  const res = parseFor(exp)
  if (!res) return

  addRawAttr(el, ':items', res.for)
  addRawAttr(el, '+alias', res.alias)

  if (res.iterator1) {
    addRawAttr(el, '+index', res.iterator1)
  }
}

export default {
  preTransformNode
}
