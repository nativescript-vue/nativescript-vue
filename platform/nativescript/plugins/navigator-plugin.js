import { topmost } from 'tns-core-modules/ui/frame'
import { ensurePage } from '../util'

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
        const navigationEntry = {
          create() {
            const vm = new (Vue.extend(component))(options.context)

            vm.$mount()
            const pageInstance = ensurePage(vm.$el, vm)

            pageCb(pageInstance)
            resolve(pageInstance)

            return pageInstance
          }
        }

        topmost().navigate(Object.assign({}, navigationEntry, options))
      })
    }
  }
}
