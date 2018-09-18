import { VUE_VIEW } from './v-template'
import { extend } from 'shared/util'

export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    '+alias': {
      type: String,
      default: 'item'
    },
    '+index': {
      type: String
    }
  },

  template: `
    <NativeListView
      ref="listView"
      :items="items"
      v-bind="$attrs"
      v-on="listeners"
      @itemTap="onItemTap"
      @itemLoading="onItemLoading"
    >
      <slot />
    </NativeListView>
  `,

  watch: {
    items: {
      handler(newVal) {
        this.$refs.listView.setAttribute('items', newVal)
        this.refresh()
      },
      deep: true
    }
  },

  created() {
    // we need to remove the itemTap handler from a clone of the $listeners
    // object because we are emitting the event ourselves with added data.
    const listeners = extend({}, this.$listeners)
    delete listeners.itemTap
    this.listeners = listeners

    this.getItemContext = getItemContext.bind(this)
  },

  mounted() {
    this.$refs.listView.setAttribute(
      '_itemTemplatesInternal',
      this.$templates.getKeyedTemplates()
    )
    this.$refs.listView.setAttribute('_itemTemplateSelector', (item, index) => {
      return this.$templates.selectorFn(this.getItemContext(item, index))
    })
  },

  methods: {
    onItemTap(args) {
      this.$emit('itemTap', extend({ item: this.items[args.index] }, args))
    },
    onItemLoading(args) {
      const index = args.index
      const items = args.object.items

      const currentItem =
        typeof items.getItem === 'function'
          ? items.getItem(index)
          : items[index]

      const name = args.object._itemTemplateSelector(currentItem, index, items)
      const context = this.getItemContext(currentItem, index)
      const oldVnode = args.view && args.view[VUE_VIEW]

      args.view = this.$templates.patchTemplate(name, context, oldVnode)
    },
    refresh() {
      this.$refs.listView.nativeView.refresh()
    }
  }
}

function getItemContext(
  item,
  index,
  alias = this.$props['+alias'],
  index_alias = this.$props['+index']
) {
  return {
    [alias]: item,
    [index_alias || '$index']: index,
    $even: index % 2 === 0,
    $odd: index % 2 !== 0
  }
}
