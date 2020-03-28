import { isObject, isDef, isPrimitive } from 'shared/util'
import { updateDevtools } from '../util'
import { VUE_ELEMENT_REF } from '../renderer/ElementNode'

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

function getTargetView(target) {
  if (isObject(target) && isDef(target.$el)) {
    return target.$el.nativeView
  } else if (isDef(target.nativeView)) {
    return target.nativeView
  } else if (target[VUE_ELEMENT_REF]) {
    return target
  }
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
        options = Object.assign(
          {
            target: this.$root
          },
          options,
          {
            context: null,
            closeCallback: closeCb
          }
        )

        const navEntryInstance = new Vue({
          name: 'ModalEntry',
          parent: options.target,
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

        getTargetView(options.target).showModal(modalPage, options)
      })
    }
  }
}
