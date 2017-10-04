import { isPage } from "./util/index";
import { Page } from 'ui/page';
import { topmost } from 'ui/frame'

export default {
    install(Vue) {
        Vue.prototype.$navigateBack = function () {
            return topmost().goBack()
        }
        Vue.prototype.$navigateTo = function (component,
                                              options = {
                                                  context: null,
                                                  animated: true,
                                                  transition: null
                                              }) {
            const placeholder = this.$document.createComment('placeholder')

            const contentComponent = Vue.extend(component)
            const vm = new contentComponent(options.context)
            vm.$mount(placeholder)

            const toPage = isPage(vm.$el) ? vm.$el.nativeView : new Page()

            if (!isPage(vm.$el)) {
                toPage.content = vm.$el.nativeView
            }

            topmost().navigate({
                create: () => toPage,
                animated: options.animated,
                transition: options.transition
            })
        }
    }
}
