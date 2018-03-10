import { getAndRemoveAttr, addRawAttr } from 'compiler/helpers'
import { normalizeElementName } from '../../element-registry'
import { parseFor } from 'compiler/parser/index'
import { warn } from 'core/util/debug'

function preTransformNode(el) {
  let vfor

  if (normalizeElementName(el.tag) === 'listview') {
    vfor = getAndRemoveAttr(el, 'v-for')
    delete el.attrsMap['v-for']
    if (process.env.NODE_ENV !== 'production' && vfor) {
      warn(
        `The v-for directive is not supported on a ${el.tag}, ` +
          'Use the "for" attribute instead. For example, instead of ' +
          `<${el.tag} v-for="${vfor}"> use <${el.tag} for="${vfor}">.`
      )
    }
  }

  const exp = getAndRemoveAttr(el, 'for') || vfor
  if (!exp) return

  const res = parseFor(exp)
  if (!res) {
    if (process.env.NODE_ENV !== 'production') {
      warn(`Invalid for expression: ${exp}`)
    }
    return
  }

  addRawAttr(el, ':items', res.for)
  addRawAttr(el, '+alias', res.alias)

  if (res.iterator1) {
    addRawAttr(el, '+index', res.iterator1)
  }
}

export default {
  preTransformNode
}
