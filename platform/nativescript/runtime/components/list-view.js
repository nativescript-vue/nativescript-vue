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
    },
    '+alias': {
      type: String,
      default: 'item'
    },
    '+index': {
      type: String
    }
  },

  render(h) {
    return h(
      'native-list-view',
      {
        ref: 'listView',
        on: this._on,
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

  created() {
    this._on = {
      itemLoading: this.onItemLoading,
      itemTap: args =>
        this.$emit(
          'itemTap',
          Object.assign({ item: this.items[args.index] }, args)
        ),
      loaded: args => this.$emit('loaded', args),
      unloaded: args => this.$emit('unloaded', args),
      loadMoreItems: args => this.$emit('loadMoreItems', args)
    }
  },

  mounted() {
    this.getItemContext = (item, index) =>
      getItemContext(item, index, this.$props['+alias'], this.$props['+index'])

    this.$refs.listView.setAttribute('items', this.items)
    this.$refs.listView.setAttribute(
      '_itemTemplatesInternal',
      this.$templates.getKeyedTemplates()
    )
    this.$refs.listView.setAttribute('_itemTemplateSelector', (item, index) => {
      return this.$templates.selectorFn(this.getItemContext(item, index))
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

      const name = args.object._itemTemplateSelector(context, index, items)
      const context = this.getItemContext(currentItem, index)
      const oldVnode = args.view && args.view[VUE_VIEW]

      args.view = this.$templates.patchTemplate(name, context, oldVnode)
    }
  }
}

function getItemContext(item, index, alias, index_alias) {
  return {
    [alias]: item,
    [index_alias || '$index']: index,
    $even: index % 2 === 0,
    $odd: index % 2 !== 0
  }
}
