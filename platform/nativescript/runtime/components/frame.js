export default {
  name: 'frame',
  created() {
    this.cache = {}
  },
  render(h) {
    return h(
      'NativeFrame',
      {
        attrs: this.$attrs,
        on: this.$listeners
      },
      this.$slots.default
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
