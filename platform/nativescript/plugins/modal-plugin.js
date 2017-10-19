import { isPage } from '../util/index'
import { Page } from 'ui/page'

export default {
  install(Vue) {
    Vue.prototype.$showModal = function(
      component,
      options = { context: null, fullscreen: false }
    ) {
      return new Promise(resolve => {
        const placeholder = this.$document.createComment('placeholder')

        const contentComponent = Vue.extend(component)
        const vm = new contentComponent(options.context)

        contentComponent.prototype.$modal = {
          close(data) {
            resolve(data)
            modalPage.closeModal()
            setTimeout(() => {
              vm.$destroy()
            })
          }
        }

        vm.$mount(placeholder)
        const modalPage = isPage(vm.$el) ? vm.$el.nativeView : new Page()

        if (!isPage(vm.$el)) {
          modalPage.content = vm.$el.nativeView
        }

        this.$root.$el.nativeView.showModal(
          modalPage,
          null,
          resolve,
          options.fullscreen
        )
      })
    }
  }
}
