import { ensurePage } from '../util'

export default {
  install(Vue) {
    Vue.prototype.$showModal = function(
      component,
      options = { context: null, fullscreen: false }
    ) {
      return new Promise(resolve => {
        const contentComponent = Vue.extend(component)
        const vm = new contentComponent(options.context)

        vm.$mount()
        const modalPage = ensurePage(vm.$el, vm)

        contentComponent.prototype.$modal = {
          close(data) {
            resolve(data)
            modalPage.closeModal()
          }
        }

        this.$root.$el.nativeView.showModal(
          modalPage,
          null,
          vm.$modal.close,
          options.fullscreen
        )
      })
    }
  }
}
