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

    Vue.navigateTo = Vue.prototype.$navigateTo = function(component, options) {
      return new Promise(resolve => {
        const placeholder = Vue.$document.createComment('placeholder')

        const contentComponent = Vue.extend(component)
        const vm = new contentComponent(options.context)
        vm.$mount(placeholder)

        const toPage = isPage(vm.$el) ? vm.$el.nativeView : new Page()

        if (!isPage(vm.$el)) {
          toPage.content = vm.$el.nativeView
        }

        toPage[VUE_VM_REF] = vm

        const frame = topmost()
        const navigate = frame ? frame.navigate : start

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
