import { addRawAttr } from 'compiler/helpers'

function preTransformNode(el) {
  if (el.tag === 'v-template') {
    // set +alias property on the v-template component
    let alias = el.parent.attrsMap['+alias'] || 'item'
    addRawAttr(el, '+alias', alias)
  }

  if (el.parent && el.parent.tag === 'v-template') {
    // set the slot scope to the list-view +alias attribute
    el.slotScope = el.parent.parent.attrsMap['+alias'] || 'item'
  }
}

export default {
  preTransformNode
}
