import { isObject, isDef, isPrimitive } from 'shared/util'
import { getFrame } from '../util/frame'
import { getFrameById } from 'tns-core-modules/ui/frame'

function getFrameInstance(frame) {
  // get the frame that we need to navigate
  // this can be a frame id (String)
  // a Vue ref to a frame
  // a Frame ViewNode
  // or a Frame instance
  if (isObject(frame) && isDef(frame.$el)) {
    frame = frame.$el.nativeView
  } else if (isPrimitive(frame)) {
    frame = getFrameById(frame)
  } else if (isDef(frame.nativeView)) {
    frame = frame.nativeView
  }
  // finally get the component instance for this frame
  return getFrame(frame.id)
}

export default {
  install(Vue) {
    Vue.prototype.$navigateBack = function(options) {
      const defaultOptions = {
        frame: 'default'
      }
      options = Object.assign({}, defaultOptions, options)
      const frame = getFrameInstance(options.frame)

      frame.back()
    }

    Vue.prototype.$navigateTo = function(component, options) {
      const defaultOptions = {
        frame: 'default'
      }
      // build options object with defaults
      options = Object.assign({}, defaultOptions, options)

      return new Promise(resolve => {
        const frame = getFrameInstance(options.frame)
        const page = new Vue({
          parent: this,
          render: h => h(component, { props: options.props })
        }).$mount().$el.nativeView

        frame.navigate(Object.assign({}, options, { create: () => page }))
        resolve(page)
      })
    }
  }
}
