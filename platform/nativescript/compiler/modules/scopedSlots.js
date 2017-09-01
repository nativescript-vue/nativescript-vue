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
  }
}
export default {
  preTransformNode
}
