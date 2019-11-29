import { updateDevtools } from '../util'

let sequentialCounter = 0

function serializeModalOptions(options) {
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  const allowed = ['fullscreen']

  return Object.keys(options)
    .filter(key => allowed.includes(key))
    .map(key => {
      return `${key}: ${options[key]}`
    })
    .concat(`uid: ${++sequentialCounter}`)
    .join(', ')
}

function _findParentModalEntry(vm) {
  if (!vm) {
    return false
  }

  let entry = vm.$parent
  while (entry && entry.$options.name !== 'ModalEntry') {
    entry = entry.$parent
  }

  return entry
}

export default {
  install(Vue) {
    Vue.mixin({
      created() {
        const self = this
        this.$modal = {
          close(data) {
            const entry = _findParentModalEntry(self)

            if (entry) {
              entry.closeCb(data)
            }
          }
        }
      }
    })

    Vue.prototype.$showModal = function(component, options) {
      return new Promise(resolve => {
        let resolved = false
        const closeCb = data => {
          if (resolved) return

          resolved = true
          resolve(data)
          modalPage.closeModal()

          // emitted to show up in devtools
          // for debugging purposes
          navEntryInstance.$emit('modal:close', data)
          navEntryInstance.$destroy()
        }

        // build options object with defaults
        options = Object.assign({}, options, {
          context: null,
          closeCallback: closeCb
        })

        const navEntryInstance = new Vue({
          name: 'ModalEntry',
          parent: this.$root,
          methods: {
            closeCb
          },
          render: h =>
            h(component, {
              props: options.props,
              key: serializeModalOptions(options)
            })
        })
        const modalPage = navEntryInstance.$mount().$el.nativeView
        updateDevtools()

        this.$root.nativeView.showModal(modalPage, options)
      })
    }
  }
}
