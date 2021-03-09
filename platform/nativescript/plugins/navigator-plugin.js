import { isObject, isDef, isPrimitive } from 'shared/util'
import { getFrame } from '../util/frame'
import { updateDevtools } from '../util'

let sequentialCounter = 0

function serializeNavigationOptions(options) {
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  const allowed = ['backstackVisible', 'clearHistory']

  return Object.keys(options)
    .filter(key => allowed.includes(key))
    .map(key => {
      return `${key}: ${options[key]}`
    })
    .concat(`uid: ${++sequentialCounter}`)
    .join(', ')
}

export function getFrameInstance(frame) {
  // get the frame that we need to navigate
  // this can be a frame id (String)
  // a Vue ref to a frame
  // a Frame ViewNode
  // or a Frame instance
  if (isObject(frame) && isDef(frame.$el)) {
    frame = frame.$el.nativeView
  } else if (isPrimitive(frame)) {
    frame = require('@nativescript/core').Frame.getFrameById(frame)
  } else if (isDef(frame.nativeView)) {
    frame = frame.nativeView
  }
  // finally get the component instance for this frame
  return getFrame(frame.id)
}

export function findParentFrame(vm) {
  if (!vm) {
    return false
  }

  let entry = vm.$parent
  while (entry && entry.$options.name !== 'Frame') {
    entry = entry.$parent
  }

  return entry
}

export default {
  install(Vue) {
    Vue.navigateBack = Vue.prototype.$navigateBack = function (
      options,
      backstackEntry = null
    ) {
      const parentFrame = findParentFrame(this)
      const defaultOptions = {
        frame: parentFrame ? parentFrame : 'default'
      }
      options = Object.assign({}, defaultOptions, options)
      const frame = getFrameInstance(options.frame)

      frame.back(backstackEntry)
    }

    Vue.navigateTo = Vue.prototype.$navigateTo = function (component, options) {
      const defaultOptions = {
        frame: 'default'
      }
      // build options object with defaults
      options = Object.assign({}, defaultOptions, options)

      return new Promise(resolve => {
        const frame = getFrameInstance(options.frame)
        const key = serializeNavigationOptions(options)
        const navEntryInstance = new Vue({
          abstract: true,
          functional: true,
          name: 'NavigationEntry',
          parent: frame,
          frame,
          render: h =>
            h(component, {
              props: options.props,
              key
            })
        })
        const page = navEntryInstance.$mount().$el.nativeView

        updateDevtools()

        const resolveOnEvent = options.resolveOnEvent
        // ensure we dont resolve twice event though this should never happen!
        let resolved = false

        const handler = args => {
          if (args.isBackNavigation) {
            page.off('navigatedFrom', handler)
            navEntryInstance.$destroy()
          }
        }
        page.on('navigatedFrom', handler)

        if (resolveOnEvent) {
          const resolveHandler = args => {
            if (!resolved) {
              resolved = true
              resolve(page)
            }
            page.off(resolveOnEvent, resolveHandler)
          }
          page.on(resolveOnEvent, resolveHandler)
        }

        // ensure that the navEntryInstance vue instance is destroyed when the
        // page is disposed (clearHistory: true for example)
        const dispose = page.disposeNativeView
        page.disposeNativeView = (...args) => {
          navEntryInstance.$destroy()
          dispose.call(page, args)
        }

        frame.navigate(Object.assign({}, options, { create: () => page }))
        if (!resolveOnEvent) {
          resolved = true
          resolve(page)
        }
      })
    }
  }
}
