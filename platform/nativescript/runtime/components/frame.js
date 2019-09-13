import { setFrame, getFrame, deleteFrame } from '../../util/frame'
import { warn } from 'core/util/debug'

export default {
  props: {
    id: {
      default: 'default'
    },
    transition: {
      type: [String, Object],
      required: false,
      default: null
    },
    'ios:transition': {
      type: [String, Object],
      required: false,
      default: null
    },
    'android:transition': {
      type: [String, Object],
      required: false,
      default: null
    },
    clearHistory: {
      type: Boolean,
      required: false,
      default: false
    },
    backstackVisible: {
      type: Boolean,
      required: false,
      default: true
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
    this.properties = Object.assign({}, this.$attrs, this.$props)

    setFrame(this.properties.id, this)
  },
  destroyed() {
    deleteFrame(this.properties.id)
  },
  render(h) {
    let vnode = null

    // Render slot to ensure default page is displayed
    if (this.$slots.default) {
      if (
        process.env.NODE_ENV !== 'production' &&
        this.$slots.default.length > 1
      ) {
        warn(
          `The <Frame> element can only have a single child element, that is the defaultPage.`
        )
      }
      vnode = this.$slots.default[0]
      vnode.key = 'default'
    }

    return h(
      'NativeFrame',
      {
        attrs: this.properties,
        on: this.$listeners
      },
      [vnode]
    )
  },
  methods: {
    _getFrame() {
      return this.$el.nativeView
    },

    _ensureTransitionObject(transition) {
      if (typeof transition === 'string') {
        return { name: transition }
      }
      return transition
    },

    _composeTransition(entry) {
      const isAndroid = require('tns-core-modules/platform').isAndroid
      const platformEntryProp = `transition${isAndroid ? 'Android' : 'iOS'}`
      const entryProp = entry[platformEntryProp]
        ? platformEntryProp
        : 'transition'
      const platformProp = `${isAndroid ? 'android' : 'ios'}:transition`
      const prop = this[platformProp] ? platformProp : 'transition'

      if (entry[entryProp]) {
        entry[entryProp] = this._ensureTransitionObject(entry[entryProp])
      } else if (this[prop]) {
        entry[entryProp] = this._ensureTransitionObject(this[prop])
      }

      return entry
    },

    notifyPageMounted(pageVm) {
      let options = {
        backstackVisible: this.backstackVisible,
        clearHistory: this.clearHistory,
        create: () => pageVm.$el.nativeView
      }

      this.$nextTick(() => {
        if (pageVm.$el.nativeView.__isNavigatedTo) {
          // Ignore pages we've navigated to, since they are already on screen
          return
        }

        this.navigate(options)
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

      this._composeTransition(entry)
      frame.navigate(entry)
    },

    back(backstackEntry = null) {
      this.navigate(backstackEntry, true)
    }
  }
}
