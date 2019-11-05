import { VUE_VIEW } from './v-template'
import { extend } from 'shared/util'

export default {
  props: {
    items: {
      type: [Array, Object],
      validator: val => {
        const ObservableArray = require('tns-core-modules/data/observable-array')
          .ObservableArray
        return Array.isArray(val) || val instanceof ObservableArray
      },
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
    if (!this.$templates) {
      return
    }

    this.$refs.listView.setAttribute(
      'itemTemplates',
      this.$templates.getKeyedTemplates()
    )
    this.$refs.listView.setAttribute('itemTemplateSelector', (item, index) => {
      return this.$templates.selectorFn(this.getItemContext(item, index))
    })
  },

  methods: {
    onItemTap(args) {
      this.$emit('itemTap', extend({ item: this.getItem(args.index) }, args))
    },
    onItemLoading(args) {
      if (!this.$templates) {
        return
      }

      const index = args.index
      const items = args.object.items

      const currentItem = this.getItem(index)

      const name = args.object._itemTemplateSelector(currentItem, index, items)
      const context = this.getItemContext(currentItem, index)
      const oldVnode = args.view && args.view[VUE_VIEW]

      args.view = this.$templates.patchTemplate(name, context, oldVnode)
    },
    refresh() {
      this.$refs.listView.nativeView.refresh()
    },
    getItem(idx) {
      return typeof this.items.getItem === 'function'
        ? this.items.getItem(idx)
        : this.items[idx]
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
