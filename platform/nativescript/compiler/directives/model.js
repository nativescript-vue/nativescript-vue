import { genComponentModel, genAssignmentCode } from 'compiler/directives/model'
import { isKnownView, getViewMeta } from '../../element-registry'

export default function model(el, dir) {
  if (el.type === 1 && isKnownView(el.tag)) {
    genViewComponentModel(el, dir.value, dir.modifiers)
  } else {
    genComponentModel(el, dir.value, dir.modifiers)
  }
}

function genViewComponentModel(el, value, modifiers) {
  const { number, trim } = modifiers || {}
  const { prop } = getViewMeta(el.tag).model

  const baseValueExpression = '$event'
  let valueExpression = `${baseValueExpression}.object[${JSON.stringify(prop)}]`
  if (trim) {
    valueExpression =
      `(typeof ${valueExpression} === 'string'` +
      `? ${valueExpression}.trim()` +
      `: ${valueExpression})`
  }
  if (number) {
    valueExpression = `_n(${valueExpression})`
  }
  const assignment = genAssignmentCode(value, valueExpression)

  el.model = {
    value: `(${value})`,
    expression: JSON.stringify(value),
    callback: `function (${baseValueExpression}) {${assignment}}`
  }
}
