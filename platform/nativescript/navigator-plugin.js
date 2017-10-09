import { isPage } from './util/index'
import { Page } from 'ui/page'
import { topmost } from 'ui/frame'
import { VUE_VM_REF } from './runtime/index'

export default {
  install(Vue) {
    Vue.prototype.$navigateBack = function() {
      const frame = topmost()
      frame.eachChildView(child => {
        const vm = child[VUE_VM_REF]

        if (vm && !vm.__is_root__) {
          vm.$destroy()
        }
      })

      return frame.goBack()
    }
    Vue.prototype.$navigateTo = function(
      component,
      options = {
        context: null,
        animated: true,
        transition: null
      }
    ) {
      const placeholder = this.$document.createComment('placeholder')

      const contentComponent = Vue.extend(component)
      const vm = new contentComponent(options.context)
      vm.$mount(placeholder)

      const toPage = isPage(vm.$el) ? vm.$el.nativeView : new Page()

      if (!isPage(vm.$el)) {
        toPage.content = vm.$el.nativeView
      }

      toPage[VUE_VM_REF] = vm

      topmost().navigate({
        create: () => toPage,
        animated: options.animated,
        transition: options.transition
      })
    }
  }
}
