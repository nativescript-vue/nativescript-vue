import { normalizeElementName } from '../../element-registry'

function preTransformNode(el, options) {
  if (el.tag === 'template') {
    let name = el.attrsMap.name

    if (name) {
      el.attrsMap['slot'] = name
      el.attrsList.push({
        name: 'slot',
        value: name
      })
    }

    let isListView = normalizeElementName(el.parent.tag) === 'listview'
    let scope = el.attrsMap.scope
    if (scope && isListView) {
      delete el.attrsMap.scope
      el.attrsList = el.attrsList.filter(attr => attr.name !== 'scope')

      el.attrsMap['slot-scope'] = scope
      el.attrsList.push({
        name: 'slot-scope',
        value: scope
      })
    }
  }
}

export default {
  preTransformNode
}
