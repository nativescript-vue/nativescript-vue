import { VUE_VIEW } from './v-template'

export default {
  name: 'list-view',
  props: {
    items: {
      type: Array,
      required: true
    },
    separatorColor: {
      type: String
    }
  },

  render(h) {
    return h(
      'native-list-view',
      {
        ref: 'listView',
        on: {
          itemLoading: this.onItemLoading,
          itemTap: args =>
            this.$emit(
              'itemTap',
              Object.assign({ item: this.items[args.index] }, args)
            ),
          loaded: args => this.$emit('loaded', args),
          unloaded: args => this.$emit('unloaded', args),
          loadMoreItems: args => this.$emit('loadMoreItems', args)
        },
        domProps: {
          items: this.items,
          separatorColor: this.separatorColor
        }
      },
      this.$slots.default
    )
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

  mounted() {
    this.$refs.listView.setAttribute('items', this.items)
    this.$refs.listView.setAttribute(
      '_itemTemplatesInternal',
      this.$templates.getKeyedTemplates()
    )
    this.$refs.listView.setAttribute('_itemTemplateSelector', (
      item,
      index /*,items*/
    ) => {
      return this.$templates.selectorFn(new ItemContext(item, index))
    })
  },

  methods: {
    onItemLoading(args) {
      const index = args.index
      const items = args.object.items

      const currentItem =
        typeof items.getItem === 'function'
          ? items.getItem(index)
          : items[index]

      const context = new ItemContext(currentItem, index)
      const name = args.object._itemTemplateSelector(context, index, items)

      let oldVnode = args.view && args.view[VUE_VIEW]
      args.view = this.$templates.patchTemplate(name, context, oldVnode)
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
