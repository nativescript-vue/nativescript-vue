import { getAndRemoveAttr, addDirective } from 'compiler/helpers'

// transforms ~test -> v-view:test
function transformNode(el) {
  const attr = Object.keys(el.attrsMap).find(attr => attr.startsWith('~'))

  if (attr) {
    const attrName = attr.substr(1)
    getAndRemoveAttr(el, attr)
    addDirective(el, 'view', `v-view:${attrName}`, '', attrName)
  }
}

export default {
  transformNode
}
