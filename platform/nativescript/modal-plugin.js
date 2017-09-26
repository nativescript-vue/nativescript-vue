const Page = require('ui/page').Page

export default {
    install(Vue) {
        Vue.prototype.$showModal = function (component, options = { context: null, fullscreen: false }) {
            return new Promise((resolve) => {
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
                    const isPage = vm.$el.tagName === 'page'
                    const modalPage = isPage ? vm.$el.nativeView : new Page()

                    if (!isPage) {
                        modalPage.content = vm.$el.nativeView
                    }

                    this.$root.$el.nativeView.showModal(modalPage, null, resolve, options.fullscreen)
                }
            )
        }
    }
}