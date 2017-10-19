import { makeMap } from 'shared/util'
import { isKnownView, getViewMeta } from '../element-registry'

export const isReservedTag = makeMap('template', true)

export const canBeLeftOpenTag = function(el) {
  return getViewMeta(el).canBeLeftOpenTag
}

export const isUnaryTag = function(el) {
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

export function isPage(el) {
  return el && el.tagName === 'page'
}

export function query(el, renderer, document) {
  // Todo
}

export const VUE_VERSION = process.env.VUE_VERSION
export const NS_VUE_VERSION = process.env.NS_VUE_VERSION

export function trace(message) {
  console.log(
    `{NSVue (Vue: ${VUE_VERSION} | NSVue: ${NS_VUE_VERSION})} -> ${message}`
  )
}

export function before(original, thisArg, wrap) {
  const __slice = Array.prototype.slice
  return function() {
    const args = __slice.call(arguments)
    wrap.apply(null, args)
    original.apply(thisArg, args)
  }
}

export function after(original, thisArg, wrap) {
  const __slice = Array.prototype.slice
  return function() {
    const args = __slice.call(arguments)
    wrap.apply(null, args)
    original.apply(thisArg, args)
  }
}
