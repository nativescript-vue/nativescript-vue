const Page = require('ui/page').Page

export default {
    install(Vue) {
        Vue.prototype.$showModal = function (component) {
            const modalPage = new Page()
            const placeholder = this.$document.createComment('placeholder')

            const content = Vue.extend(Object.assign({}, component))
            content.prototype.$modal = {
                close() {
                    modalPage.closeModal()
                }
            }

            const vm = new content
            vm.$mount(placeholder)
            modalPage.content = vm.$el.nativeView

            this.$root.$el.nativeView.showModal(modalPage)
        }
    }
}