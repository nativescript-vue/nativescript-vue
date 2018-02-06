import { genComponentModel, genAssignmentCode } from 'compiler/directives/model'
import { isKnownView, getViewMeta } from '../../element-registry'
import { addHandler, addAttr } from 'compiler/helpers'

export default function model(el, dir) {
  if (el.type === 1 && isKnownView(el.tag)) {
    genDefaultModel(el, dir.value, dir.modifiers)
  } else {
    genComponentModel(el, dir.value, dir.modifiers)
  }
}

function genDefaultModel(el, value, modifiers) {
  const { trim, number } = modifiers || {}
  const { prop, event } = getViewMeta(el.tag).model

  let valueExpression = `$event.value${trim ? '.trim()' : ''}`

  if (number) {
    valueExpression = `_n(${valueExpression})`
  }

  const code = genAssignmentCode(value, valueExpression)

  addAttr(el, prop, `(${value})`)
  addHandler(el, event, code, null, true)
}
