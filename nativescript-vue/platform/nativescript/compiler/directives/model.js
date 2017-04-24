import {addHandler, addAttr} from 'compiler/helpers'
import {genComponentModel, genAssignmentCode} from 'compiler/directives/model'

const valueTypes = ['text', 'value', 'checked', 'date', 'selectedIndex', 'time']

export default function model(el, dir, _warn) {
    if (el.type === 1) {
        genDefaultModel(el, dir.value, dir.modifiers)
    } else {
        genComponentModel(el, dir.value, dir.modifiers)
    }
}

function genDefaultModel(el, value, modifiers) {
    const {trim, number} = modifiers || {}
    const event = valueTypes.map(type => type + 'Change').join(',')


    let valueExpression = `$event.value${trim ? '.trim()' : ''}`

    if (number) {
        valueExpression = `_n(${valueExpression})`
    }

    const code = genAssignmentCode(value, valueExpression)

    valueTypes.forEach(type => addAttr(el, type, `(${value})`))
    addHandler(el, event, code, null, true)
}