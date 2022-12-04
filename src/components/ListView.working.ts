import { defineComponent, h, warn } from "@vue/runtime-core";

import {
  ItemEventData,
  Label,
  ListView as NSCListView,
  ObservableArray,
  StackLayout,
} from "@nativescript/core";

import {
  getCurrentInstance,
  ref,
  VNode,
  watch,
  onBeforeUpdate,
  onUpdated,
} from "..";
import { NSVElement, NSVViewFlags } from "../dom";
import { registerElement } from "../registry";
import { ELEMENT_REF } from "../runtimeHelpers";

registerElement("NSCListView", () => NSCListView, {
  viewFlags: NSVViewFlags.NO_CHILDREN,
});

registerElement("NSCListViewDummyHolder", () => StackLayout);

declare global {
  interface ListItem<T = any> {
    item: T;
    index: number;
    even: boolean;
    odd: boolean;
  }
}

function getListItem(item, index): ListItem {
  return {
    item,
    index,
    even: index % 2 === 0,
    odd: index % 2 !== 0,
  };
}

const LIST_CELL_ID = Symbol("list_cell_id");

export const ListView = /*#__PURE__*/ defineComponent({
  props: {
    items: Array<any>,
    itemTemplateSelector: Function,
  },
  setup(props, ctx) {
    const itemTemplates = Object.keys(ctx.slots).map((slotName) => {
      return {
        key: slotName,
        createView() {
          // no need to return anything here
        },
      };
    });
    const getSlotName = (itemCtx: ListItem) =>
      props.itemTemplateSelector?.(itemCtx) ?? "default";

    const listView = ref(null);

    const vm = getCurrentInstance();

    watch(props, () => {
      console.log("props changed?");
      try {
        const lv: NSCListView = listView.value?.nativeView;
        lv?.refresh();
      } catch (err) {
        console.log(err);
      }
    });

    let cellId = 0;
    interface ItemCellData {
      itemCtx: ListItem;
      slotName: string;
    }
    const cells = ref<Record<string, ItemCellData>>({});

    function onitemLoading(event: ItemEventData) {
      const el = event.view?.[ELEMENT_REF] as NSVElement;
      const id = el?.nativeView[LIST_CELL_ID] ?? `LIST_CELL_${cellId++}`;

      const itemCtx: ListItem = getListItem(
        props.items instanceof ObservableArray
          ? props.items.getItem(event.index)
          : props.items[event.index],
        event.index
      );

      // update the cell data with the current row
      cells.value[id] = {
        itemCtx,
        slotName: getSlotName(itemCtx),
      };

      // trigger an update!
      vm.update();

      // find the vnode rendering this cell
      const vnode = (vm.subTree.children as VNode[]).find((vnode) => {
        return vnode.key === id;
      });

      // store the cell id on the Element itself so we can retrieve it when recycling kicks in
      const cellEl = vnode.el.nativeView;
      cellEl[LIST_CELL_ID] = id;

      // finally, set the event.view to the rendered cellEl
      event.view = cellEl;
      // event.view = new Label();
    }

    function itemTemplateSelector(item, index) {
      // pass on the template selector call with the ListItem context
      return getSlotName(getListItem(item, index));
    }

    onBeforeUpdate(() => {
      console.time("update");
    });
    onUpdated(() => {
      console.timeEnd("update");
    });

    return () => {
      console.log("RENDER");
      // return h("StackLayout", [
      //   h("NSCListView", {
      //     ref: listView,
      //     items: props.items,
      //     itemTemplates,
      //     itemTemplateSelector,
      //     onitemLoading,
      //   }),
      //   ...Object.entries(cells.value).map(([id, child]) => {
      //     const vnodes: VNode[] = ctx.slots[child.slotName](child.itemCtx);

      //     if (vnodes.length > 1) {
      //       warn(
      //         `ListView template must contain a single root element. Found: ${vnodes.length}. Only the first one will be used.`
      //       );
      //     }

      //     const vnode: VNode = vnodes[0];
      //     // set the key to the list cell id, so we can find this cell later...
      //     vnode.key = id;

      //     return vnode;
      //   }),
      // ]);
      return h(
        "NSCListView",
        {
          ref: listView,
          items: props.items,
          itemTemplates,
          itemTemplateSelector,
          onitemLoading,
        },
        // render all realized templates as children
        Object.entries(cells.value).map(([id, child]) => {
          const vnodes: VNode[] = ctx.slots[child.slotName](child.itemCtx);

          if (vnodes.length > 1) {
            warn(
              `ListView template must contain a single root element. Found: ${vnodes.length}. Only the first one will be used.`
            );
          }

          const vnode: VNode = vnodes[0];
          // set the key to the list cell id, so we can find this cell later...
          vnode.key = id;

          return vnode;
        })
      );
    };
  },
});
