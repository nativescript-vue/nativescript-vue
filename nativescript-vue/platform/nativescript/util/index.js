import {makeMap} from 'shared/util'
import {isKnownView, getViewMeta} from '../../../element-registry'

export const isReservedTag = makeMap('template', true)

export const canBeLeftOpenTag = makeMap('', true)

export const isUnaryTag = function (el) {
    const meta = getViewMeta(el)
    return meta && meta.isUnaryTag
}

export function mustUseProp() {
    console.log('mustUseProp')
}

export function getTagNamespace() {
    console.log('getTagNamespace')
}

export function isUnknownElement(el) {

    let k = !isKnownView(el)
    console.log(`isUnknown ${el}? ${k}`)
    return k
}

export function query(el, document) {
    // todo
    console.log('query', el, document)
}
