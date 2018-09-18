import { setFrame, getFrame, deleteFrame } from '../../util/frame'
import { extend } from 'shared/util'

let idCounter = 1

const propMap = {
  transition: 'transition',
  'ios:transition': 'transitioniOS',
  'android:transition': 'transitionAndroid'
}

export default {
  props: {
    id: {
      default: 'default'
    },
    transition: {
      type: [String, Object],
      default: _ => ({ name: 'slide', duration: 200 })
    },
    'ios:transition': {
      type: [String, Object],
      default: ''
    },
    'android:transition': {
      type: [String, Object],
      default: ''
    },
    // injected by the template compiler
    hasRouterView: {
      default: false
    }
  },
  data() {
    return {
      properties: {}
    }
  },
  created() {
    let properties = {}

    if (getFrame(this.$props.id)) {
      properties.id = this.$props.id + idCounter++
    }

    this.properties = Object.assign({}, this.$attrs, this.$props, properties)

    setFrame(this.properties.id, this)
  },
  destroyed() {
    deleteFrame(this.properties.id)
  },
  render(h) {
    return h(
      'NativeFrame',
      {
        attrs: this.properties,
        on: this.$listeners
      },
      this.$slots.default
    )
  },
  // computed: {
  //   history() {
  //     return (this.$router && this.$router.history) || {}
  //   },
  //
  //   store() {
  //     return this.history.store || {}
  //   },
  //
  //   replacing() {
  //     return this.store.operation === 'replace'
  //   },
  //
  //   isGoingBack() {
  //     return this.store && this.store.isGoingBack
  //       ? ios
  //         ? undefined
  //         : true
  //       : false
  //   }
  // },
  methods: {
    _getFrame() {
      return this.$el.nativeView
    },

    _composeTransition() {
      const result = {}

      for (const prop in propMap) {
        if (this[prop]) {
          const name = propMap[prop]
          result[name] = {}

          if (typeof this[prop] === 'string') {
            result[name].name = this[prop]
          } else {
            extend(result[name], this[prop])
          }
        }
      }

      return result
    },

    async notifyPageMounted(pageVm) {
      await this.$nextTick()

      this.navigate({
        create: () => pageVm.$el.nativeView
      })
    },

    navigate(entry, back = false) {
      const frame = this._getFrame()

      if (back) {
        return frame.goBack(entry)
      }

      // resolve the page from the entry and attach a navigatedTo listener
      // to fire the frame events
      const page = entry.create()
      page.once('navigatedTo', () => {
        this.$emit('navigated', entry)
      })

      const handler = args => {
        if (args.isBackNavigation) {
          page.off('navigatedFrom', handler)

          this.$emit('navigatedBack', entry)
        }
      }
      page.on('navigatedFrom', handler)

      entry.create = () => page

      Object.assign(entry, this._composeTransition())

      frame.navigate(entry)
    },

    back(backstackEntry = null) {
      this.navigate(backstackEntry, true)
    }
  }
}
