function preTransformNode(el) {
  if (el.parent && el.parent.tag === 'v-template') {
    el.slotScope = 'item'
  }
}

export default {
  preTransformNode
}
