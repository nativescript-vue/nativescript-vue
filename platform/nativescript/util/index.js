import { isKnownView, getViewMeta, getViewClass } from '../element-registry'
import { makeMap, once } from 'shared/util'
import { VUE_VM_REF } from '../constants'

export const isReservedTag = makeMap('template', true)

let _Vue

export function setVue(Vue) {
  _Vue = Vue
}

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
  return el && el.tagName === 'nativepage'
}

/** @deprecated */
export function ensurePage(el, vm) {
  if (!isPage(el)) {
    const page = new (getViewClass('page'))()
    page.content = el.nativeView
    if (vm) {
      page[VUE_VM_REF] = vm
      page.disposeNativeView = after(page.disposeNativeView, page, () =>
        vm.$destroy()
      )
    }
    return page
  }

  if (vm) {
    el.nativeView[VUE_VM_REF] = vm
    el.disposeNativeView = after(el.disposeNativeView, el, () => vm.$destroy())
  }

  return el.nativeView
}

export function query(el, renderer, document) {
  // Todo
}

export const VUE_VERSION = process.env._VUE_VERSION
export const NS_VUE_VERSION = process.env._NS_VUE_VERSION

const infoTrace = once(() => {
  console.log(
    `NativeScript-Vue has "Vue.config.silent" set to true, to see output logs set it to false.`
  )
})

export function trace(message) {
  if (_Vue && _Vue.config.silent) {
    return infoTrace()
  }

  if (_Vue && !_Vue.config.suppressRenderLogs) {
    console.log(
      `{NSVue (Vue: ${VUE_VERSION} | NSVue: ${NS_VUE_VERSION})} -> ${message}`
    )
  }
}

export function before(original, thisArg, wrap) {
  return function(...args) {
    wrap.call(null, ...args)
    original.call(thisArg, ...args)
  }
}

export function after(original, thisArg, wrap) {
  return function(...args) {
    original.call(thisArg, ...args)
    wrap.call(null, ...args)
  }
}

export function updateDevtools() {
  if (global.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
    try {
      global.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('flush')
    } catch (err) {
      //
    }
  }
}
