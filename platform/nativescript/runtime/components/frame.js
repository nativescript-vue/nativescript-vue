import { setFrame, getFrame, deleteFrame } from '../../util/frame'
import { PAGE_REF } from './page'

let idCounter = 1;

const propMap = {
  'transition': 'transition',
  'transition-ios': 'transitioniOS',
  'transition-android': 'transitionAndroid'
}

const flipper = {
  slide: "slideRight",
  slideLeft: "slideRight",
  slideRight: "slideLeft",
  flip: "flipLeft",
  flipRight: "flipLeft",
  flipLeft: "flipRight",
  fade: "fade",
  explode: "explode",
  curl: "curlDown",
  curlUp: "curlDown",
  curlDown: "curlUp"
}

export default {
  props: {
    id: {
      default: 'default'
    },
    transition: {
      type: [String, Object],
      default: 'slide'
    },
    'transition-ios': {
      type: [String, Object],
      default: ''
    },
    'transition-android': {
      type: [String, Object],
      default: ''
    },
    "back-transition": {
      type: String,
      default: "flip"
    },
    // injected by the template compiler
    hasRouterView: {
      default: false
    }
  },
  data() {
    return {
      properties: {},
      pageRoutes: []
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
    let vnode = this.$slots.default

    if (this.hasRouterView && this.isBackNavigation) {
      this.isBackNavigation = false
      vnode = this.$el.nativeView.currentPage[PAGE_REF] || vnode
    }

    return h(
      'NativeFrame',
      {
        attrs: this.properties,
        on: this.$listeners
      },
      vnode
    )
  },
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
            Object.assign(result[name], this[prop])
          }
        }
      }

      return result
    },

    notifyPageMounted(pageVm) {
      this.navigate({
        create: _ => pageVm.$el.nativeView
      })
    },

    notifyPageLeaving(isGoingBack) {
      this.isGoingBack = isGoingBack;
    },

    navigate(entry, back = this.isGoingBack) {
      if (this.isBackNavigation) {
        console.log('skipping navigate()')
        return
      }

      const frame = this._getFrame()
      const transition = this._composeTransition()

      Object.assign(entry, transition, entry)

      if (back) {
        if (this.backTransition === "flip") {
          entry.transition.name = flipper[entry.transition.name]
        }

        return frame.navigate(entry)
      }

      entry.clearHistory && this.$emit('beforeReplace', entry)
      !entry.clearHistory && this.$emit('beforePush', entry)

      // resolve the page from the entry and attach a navigatedTo listener
      // to fire the frame events
      const page = entry.create()
      page.once('navigatedTo', () => {
        entry.clearHistory && this.$emit('replace', entry)
        !entry.clearHistory && this.$emit('push', entry)
      })
      page.on('navigatedFrom', ({ isBackNavigation }) => {
        if (isBackNavigation) {
          page.off('navigatedFrom')
          this.$emit('back', entry)

          if (!this.hasRouterView) return
          this.isBackNavigation = true

          // since this was a page navigation
          // we need to find the previous page's path
          // and navigate back to it
          const lastPageRoute = this.pageRoutes.pop()
          while (this.$router.currentRoute.fullPath !== lastPageRoute) {
            this.$router.go(-1)
          }
          this.$router.go(-1)
        }
      })
      entry.create = () => page

      frame.navigate(entry)
    },

    back(backstackEntry = null) {
      this.navigate(backstackEntry, true)
    },
    push(entry) {
      this.navigate(entry)
    },
    replace(entry) {
      entry.clearHistory = true

      this.navigate(entry)
    }
  }
}
