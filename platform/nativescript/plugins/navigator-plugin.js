import { isPage } from '../util/index'
import { Page } from 'ui/page'
import { topmost } from 'ui/frame'
import { start } from 'application'
import { VUE_VM_REF } from '../runtime/index'
import { after } from '../util'

export default {
  install(Vue) {
    Vue.navigateBack = Vue.prototype.$navigateBack = function() {
      return topmost().goBack()
    }

    Vue.navigateTo = Vue.prototype.$navigateTo = function(
      component,
      options = {},
      pageCb = () => {}
    ) {
      return new Promise(resolve => {
        const frame = topmost()
        const navigate = frame ? frame.navigate : start

        if (isPage(component)) {
          return navigate(
            Object.assign(options, {
              create() {
                return component
              }
            })
          )
        }

        const placeholder = Vue.$document.createComment('placeholder')

        let vm = component
        if (!component.__is_root__) {
          const contentComponent = Vue.extend(component)
          vm = new contentComponent(options.context)
          vm.$mount(placeholder)
        }

        const toPage = isPage(vm.$el) ? vm.$el.nativeView : new Page()

        if (!isPage(vm.$el)) {
          toPage.content = vm.$el.nativeView
        }

        toPage[VUE_VM_REF] = vm

        navigate.call(
          frame,
          Object.assign(
            {
              create: () => {
                if (frame) {
                  toPage.disposeNativeView = after(
                    toPage.disposeNativeView,
                    toPage,
                    () => {
                      vm.$destroy()
                    }
                  )
                }

                pageCb(toPage)
                resolve(toPage)
                return toPage
              }
            },
            options
          )
        )
      })
    }
  }
}
