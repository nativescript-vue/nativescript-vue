import { setFrame, deleteFrame } from '../../util/frame'
import { PAGE_REF } from './page'

let idCounter = 1;

export default {
  props: {
    id: {
      default: 'default'
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
      properties.id = this.$props.id + idCounter++;
    }

    this.properties = Object.assign({}, this.$attrs, this.$props, properties);

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

    notifyPageMounted(pageVm) {
      this.$nextTick(() => {
        this.navigate({
          create: _ => pageVm.$el.nativeView
        })
      })
    },

    navigate(entry, back = false) {
      if (this.isBackNavigation) {
        console.log('skipping navigate()')
        return
      }
      const frame = this._getFrame()

      if (back) {
        return frame.goBack(entry)
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
