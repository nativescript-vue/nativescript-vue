export const PAGE_REF = '__vuePageRef__'
import { ios } from 'tns-core-modules/application'

export default {
  render(h) {
    return h(
      'NativePage',
      {
        attrs: this.$attrs,
        on: this.$listeners
      },
      this.$slots.default
    )
  },
  created() {
    if (this.$router) {
      // Sometimes the parent is undefined
      // See https://github.com/nativescript-vue/nativescript-vue/issues/292
      if (this.$vnode.parent) {
        this.$vnode.parent.data.keepAlive = true
      }
    }
  },
  mounted() {
    this.$el.nativeView[PAGE_REF] = this

    const frame = this._findParentFrame()

    if (frame) {
      frame.notifyPageMounted(this)
    }

    const handler = e => {
      if (e.isBackNavigation) {
        this.$el.nativeView.off('navigatedFrom', handler)

        if (!this.$router) {
          return this.$parent.$destroy()
        }

        if (ios) {
          this._findParentFrame().isGoingBack = undefined
          const history = this.$router.history

          history.index -= 1
          history.updateRoute(history.stack[history.index])
        }

        this.$vnode.parent.data.keepAlive = false
        this.$parent.$destroy()
      }
    }
    this.$el.nativeView.on('navigatedFrom', handler)
  },
  methods: {
    _findParentFrame() {
      let parentFrame = this.$parent
      while (parentFrame && parentFrame.$options.name !== 'Frame') {
        parentFrame = parentFrame.$parent
      }

      return parentFrame
    }
  },
  deactivated() {
    const frame = this._findParentFrame()

    if (frame && this.$router) {
      frame.notifyPageLeaving(this.$router.history)

      if (this._watcher) {
        this._watcher.teardown()
      }

      let i = this._watchers.length

      while (i--) {
        this._watchers[i].teardown()
      }
    }
  }
}
