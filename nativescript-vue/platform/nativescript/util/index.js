import {makeMap} from 'shared/util'
import {isKnownView, getViewMeta} from '../element-registry'

export const isReservedTag = makeMap('template', true)

export const canBeLeftOpenTag = function (el) {
    return getViewMeta(el).canBeLeftOpenTag
}

export const isUnaryTag = function (el) {
    return getViewMeta(el).isUnaryTag
}

export function mustUseProp() {
    // console.log('mustUseProp')
}

export function getTagNamespace(el) {
    return getViewMeta(el).tagNamespace
}

export function isUnknownElement(el) {
    return !isKnownView(el)
}

export function query(el, renderer, document) {
    // Todo
}
