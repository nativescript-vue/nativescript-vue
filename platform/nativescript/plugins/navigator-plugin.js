import { isObject, isDef, isPrimitive } from 'shared/util'
import { getFrame } from '../util/frame'

export function getFrameInstance(frame) {
  // get the frame that we need to navigate
  // this can be a frame id (String)
  // a Vue ref to a frame
  // a Frame ViewNode
  // or a Frame instance
  if (isObject(frame) && isDef(frame.$el)) {
    frame = frame.$el.nativeView
  } else if (isPrimitive(frame)) {
    frame = require('tns-core-modules/ui/frame').getFrameById(frame)
  } else if (isDef(frame.nativeView)) {
    frame = frame.nativeView
  }
  // finally get the component instance for this frame
  return getFrame(frame.id)
}

export function findParentNavigationEntry(vm) {
  if (!vm) {
    return false
  }

  let entry = vm.$parent
  while (entry && entry.$options.name !== 'NavigationEntry') {
    entry = entry.$parent
  }

  return entry
}

export default {
  install(Vue) {
    Vue.prototype.$navigateBack = function(options, backstackEntry = null) {
      const navEntry = findParentNavigationEntry(this)
      const defaultOptions = {
        frame: navEntry ? navEntry.$options.frame : 'default'
      }
      options = Object.assign({}, defaultOptions, options)
      const frame = getFrameInstance(options.frame)

      frame.back(backstackEntry)
    }

    Vue.prototype.$navigateTo = function(component, options) {
      const defaultOptions = {
        frame: 'default'
      }
      // build options object with defaults
      options = Object.assign({}, defaultOptions, options)

      return new Promise(resolve => {
        const frame = getFrameInstance(options.frame)
        const navEntryInstance = new Vue({
          name: 'NavigationEntry',
          parent: this.$root,
          frame,
          props: {
            frame: {
              default: frame.id
            }
          },
          render: h => h(component, { props: options.props })
        })
        const page = navEntryInstance.$mount().$el.nativeView

        const handler = args => {
          if (args.isBackNavigation) {
            page.off('navigatedFrom', handler)
            navEntryInstance.$destroy()
          }
        }
        page.on('navigatedFrom', handler)

        // ensure that the navEntryInstance vue instance is destroyed when the
        // page is disposed (clearHistory: true for example)
        const dispose = page.disposeNativeView
        page.disposeNativeView = (...args) => {
          navEntryInstance.$destroy()
          dispose.call(page, args)
        }

        frame.navigate(Object.assign({}, options, { create: () => page }))
        resolve(page)
      })
    }
  }
}
