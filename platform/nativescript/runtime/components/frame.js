export function generateNavigationKey(page) {
  if (page) {
    return `entry-${page._domId}`
  }

  return 'entry-default'
}

export default {
  name: 'frame',
  data() {
    return {
      backStack: [],
      defaultEntry: ''
    }
  },
  watch: {
    backStack(stack) {
      // console.log(stack)
      for (const key of this.cache) {
        // clear cache when backstack changes
        if (stack.indexOf(key) === -1) {
          const vnode = this.cache[key]
          vnode && vnode.componentInstance.$destroy()
          delete this.cache[key]
        }
      }
    }
  },
  created() {
    this.cache = {}
  },
  render(h) {
    const vnode = this.$slots.default ? this.$slots.default[0] : null
    const currentPage = this.$el ? this.$el.nativeView.currentPage : null

    if (vnode) {
      const key = generateNavigationKey(currentPage)
      vnode.key = vnode.key || (vnode.isComment ? 'comment' : vnode.tag)

      if (vnode.key.indexOf(key) === -1) {
        vnode.key = `__navigation-${key}-${vnode.key}`
      }
      if (this.cache[key]) {
        if (vnode.key === this.cache[key].key) {
          // restore vnode from cache
          vnode.componentInstance = this.cache[key].componentInstance
        } else {
          // replace vnode to cache
          this.cache[key].componentInstance.$destroy()
          this.cache[key] = vnode
        }
      } else {
        // cache new vnode
        this.cache[key] = vnode
      }
      vnode.data.keepAlive = true

      console.log(vnode)
    }
    return h(
      'NativeFrame',
      {
        attrs: this.$attrs,
        on: this.$listeners
      },
      [vnode]
    )
  },
  methods: {
    navigateToPage(page) {
      this.$el.nativeView.navigate({
        create: () => {
          page.on('navigatedTo', () => {
            console.log(this.backStack)
            const pageUniqueKey = generateNavigationKey(page)
            console.log(`[${pageUniqueKey}] -> navigatedTo event fired`)
            if (this.backStack.length > 0) {
              this.backStack.push(pageUniqueKey)
            } else {
              this.backStack.push('default-entry')
              this.defaultEntry = pageUniqueKey
            }

            page.off('navigatedTo')
          })

          page.on('navigatedFrom', navigationData => {
            const pageUniqueKey = generateNavigationKey(page)
            console.log(`[${pageUniqueKey}] -> navigatedFrom event fired`)

            if (navigationData.isBackNavigation) {
              const index = this.backStack.indexOf(pageUniqueKey)
              if (index !== -1) {
                this.backStack.splice(index, 1)
                this.$router.back()
              }
            }
          })
          return page
        }
      })
    }
  }
}
