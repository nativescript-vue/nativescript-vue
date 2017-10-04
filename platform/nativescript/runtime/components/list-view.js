const VUE_VIEW = '__vueVNodeRef__'

export default {
  name: 'list-view',

  template: `<native-list-view
                    ref="listView"
                    @itemLoading="onItemLoading"
                    @itemTap="onItemTap"
                    @loaded="onLoaded"
                    @unloaded="onUnloaded"
                    @loadMoreItems="onLoadMoreItems">
               </native-list-view>`,

  props: {
    items: {
      type: Array,
      required: true
    },
    templateSelector: {
      type: Function,
      default: () => 'default'
    },
    separatorColor: {
      type: String
    }
  },

  created() {
    this._templateMap = new Map()
  },

  mounted() {
    this.setupTemplates()

    this.$refs.listView.setAttribute('items', this.items)

    if (this.separatorColor) {
      this.$refs.listView.setAttribute('separatorColor', this.separatorColor)
    }
  },

  watch: {
    items: {
      handler(newVal) {
        this.$refs.listView.setAttribute('items', newVal)
        this.$refs.listView.nativeView.refresh()
      },
      deep: true
    }
  },

  methods: {
    onItemTap(args) {
      this.$emit(
        'itemTap',
        Object.assign({ item: this.items[args.index] }, args)
      )
    },

    onLoaded(args) {
      this.$emit('loaded', args)
    },

    onUnloaded(args) {
      this.$emit('unloaded', args)
    },

    onLoadMoreItems(args) {
      this.$emit('loadMoreItems', args)
    },

    setupTemplates() {
      const self = this
      const slots = Object.keys(this.$scopedSlots)

      slots.forEach(slotName => {
        const keyedTemplate = {
          key: slotName,
          createView() {
            let vnode = self.getItemTemplate('', 0)
            vnode.elm.nativeView[VUE_VIEW] = vnode
            return vnode.elm.nativeView
          }
        }
        this._templateMap.set(slotName, keyedTemplate)
      })

      this.setItemTemplates()
    },

    setItemTemplates() {
      const templates = []
      this._templateMap.forEach(value => {
        templates.push(value)
      })

      this.$refs.listView.setAttribute('_itemTemplatesInternal', templates)

      if (typeof this.templateSelector === 'function') {
        this.$refs.listView.setAttribute(
          '_itemTemplateSelector',
          (item, index, items) => {
            return this.templateSelector(new ItemContext(item, index))
          }
        )
      }
    },

    onItemLoading(args) {
      const index = args.index
      const items = args.object.items
      const currentItem =
        typeof items.getItem === 'function'
          ? items.getItem(index)
          : items[index]

      let vnode
      if (args.view) {
        vnode = args.view[VUE_VIEW]

        if (!vnode) {
          console.log('Cant reuse view...')
        }
      }

      vnode = this.getItemTemplate(currentItem, index, vnode)
      args.view = vnode.elm.nativeView
      args.view[VUE_VIEW] = vnode
    },

    getItemTemplate(item, index, oldVnode) {
      let context = new ItemContext(item, index)
      let template = 'default'
      if (typeof this.templateSelector === 'function') {
        template = this.templateSelector(context)
      }
      //
      // let slot = this.$scopedSlots[template] ? this.$scopedSlots[template] : this.$scopedSlots.default
      // let vnode = slot(context)[0]
      // this.__patch__(oldVnode, vnode)
      //
      // return vnode

      return this.$renderTemplate(template, context, oldVnode)
    }
  }
}

class ItemContext {
  constructor(item, index) {
    this.$index = index
    if (typeof item === 'object') {
      Object.assign(this, item)
    } else {
      this.value = item
    }
    this.even = index % 2 === 0
    this.odd = !this.even
  }
}
