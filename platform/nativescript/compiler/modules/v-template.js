function preTransformNode(el) {
  if (el.parent && el.parent.tag === 'v-template') {
    let alias = el.parent.parent.attrsMap['+alias'] || 'item'
    let index = el.parent.parent.attrsMap['+index'] || '$index'
    el.slotScope = buildScopeString(alias, index)
  }
}

export default {
  preTransformNode
}

export function buildScopeString(alias, index) {
  return `{ ${alias}, ${index}, $even, $odd }`
}
