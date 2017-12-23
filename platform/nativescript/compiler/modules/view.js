import { getAndRemoveAttr, addDirective } from 'compiler/helpers'

// transforms ~test -> v-view:test
function transformNode(el) {
  const attr = Object.keys(el.attrsMap).find(attr => attr.startsWith('~'))

  if (attr) {
    const attrName = attr.substr(1)
    let [arg, ...modifiers] = attrName.split('.')
    modifiers = modifiers.reduce((mods, mod) => {
      mods[mod] = true
      return mods
    }, {})
    getAndRemoveAttr(el, attr)
    addDirective(el, 'view', `v-view:${attrName}`, '', arg, modifiers)
  }
}

export default {
  transformNode
}
