import { VUE_VM_REF } from '../runtime/index'
import { isPage } from '../util/index'
import { start } from 'tns-core-modules/application'
import { topmost } from 'tns-core-modules/ui/frame'
import { after } from '../util'
import { Page } from 'tns-core-modules/ui/page'

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
