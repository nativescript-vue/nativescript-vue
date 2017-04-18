import {makeMap} from 'shared/util'

export const isReservedTag = makeMap('template', true)

export const canBeLeftOpenTag = makeMap('', true)

export const isUnaryTag = makeMap('img,image', true)

export function mustUseProp() {
    console.log('mustUseProp')
}

export function getTagNamespace() {
    console.log('getTagNamespace')
}

export function isUnknownElement(el) {
    console.log('isUnknownElement', el)
}

export function query(el, document) {
    // todo
}
