import { defineComponent, h, ref, watch } from '@vue/runtime-core';

import {
  ItemEventData,
  ListView as NSCListView,
  ObservableArray,
} from '@nativescript/core';

import { NSVViewFlags } from '../dom';
import { registerElement } from '../registry';
import { createItemContext, ListItem, useItemTemplates } from './itemTemplates';

registerElement('NSCListView', () => NSCListView, {
  viewFlags: NSVViewFlags.NO_CHILDREN,
});

export type { ListItem };

/** Payload of the ListView `itemTap` event. */
export type ListViewItemTapEvent<T = any> = ItemEventData & ListItem<T>;

export const ListView = /*#__PURE__*/ defineComponent({
  name: 'ListView',
  props: {
    items: {
      validator(value) {
        return Array.isArray(value) || value instanceof ObservableArray;
      },
    },
    itemTemplateSelector: Function,
  },
  emits: {
    itemTap: (event: ListViewItemTapEvent) => !!event,
  },
  setup(props, ctx) {
    const { itemTemplates, templateNameFor, renderCell, cellVNodes } =
      useItemTemplates<ListItem>({
        slots: ctx.slots,
        selectTemplate: (item) => props.itemTemplateSelector?.(item),
        componentName: 'ListView',
      });

    const listView = ref(null);

    function refresh() {
      try {
        // ObservableArray notifies the native ListView of changes itself
        if (props.items instanceof ObservableArray) {
          return;
        }

        const lv: NSCListView = listView.value?.nativeView;
        lv?.refresh();
      } catch (err) {
        console.error('Error while refreshing ListView', err);
      }
    }

    // depth 1 tracks the array's length and slots without walking into the
    // items themselves; cells re-render on their own when item fields change
    watch(() => props.items, refresh, { deep: 1 });
    watch(() => props.itemTemplateSelector, refresh);

    function listItemAt(index: number): ListItem {
      return createItemContext(
        props.items instanceof ObservableArray
          ? props.items.getItem(index)
          : props.items[index],
        index,
      );
    }

    // the native event carries only the index; the template's item context
    // is what handlers want
    function onItemTap(event: ItemEventData) {
      ctx.emit('itemTap', Object.assign(event, listItemAt(event.index)));
    }

    function onItemLoading(event: ItemEventData) {
      event.view = renderCell(listItemAt(event.index), event.view);
    }

    function itemTemplateSelector(item, index) {
      return templateNameFor(createItemContext(item, index));
    }

    return () => {
      return h(
        'NSCListView',
        {
          ref: listView,
          items: props.items,
          itemTemplates,
          itemTemplateSelector,
          onItemLoading,
          onItemTap,
        },
        cellVNodes(),
      );
    };
  },
});
