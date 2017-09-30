const Page = require('ui/page').Page
const topmost = require('ui/frame').topmost

export default {
  install(Vue) {
    Vue.prototype.$navigateBack = function() {
      return topmost().goBack()
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

      const isPage = vm.$el.tagName === 'page'
      const toPage = isPage ? vm.$el.nativeView : new Page()

      if (!isPage) {
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
