import { defineComponent, h, warn } from "@vue/runtime-core";

import { ItemEventData, ListView as NSCListView } from "@nativescript/core";

import { registerElement } from "../registry";
import { NSVElement, NSVRoot, NSVViewFlags } from "../dom";
import {
  render,
  ref,
  watch,
  createApp,
  getCurrentInstance,
  cloneVNode,
  VNode,
} from "..";
import { ELEMENT_REF } from "../runtimeHelpers";

registerElement("NSCListView", () => NSCListView, {
  viewFlags: NSVViewFlags.NO_CHILDREN,
});

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
          // console.log("nope", slotName);
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
    const cells = ref<Record<number, ItemCellData>>({});

    return () => {
      return h(
        "NSCListView",
        {
          ref: listView,
          items: props.items,
          itemTemplates,
          ...ctx.attrs,
          itemTemplateSelector(item, index) {
            // pass on the template selector call with the ListItem context
            return getSlotName(getListItem(item, index));
          },
          [`on${NSCListView.itemLoadingEvent}`](event: ItemEventData) {
            const el = event.view?.[ELEMENT_REF] as NSVElement;
            const id = el?.nativeView[LIST_CELL_ID] ?? cellId++;

            console.log("LIST CELL ID", id);

            const previousVnode = (el as any)?.__vnode;
            console.log("previousVnode", !!previousVnode);

            // const container = (el?.parentNode as NSVRoot) ?? new NSVRoot();
            const itemCtx: ListItem = getListItem(
              props.items[event.index],
              event.index
            );
            const slotName = getSlotName(itemCtx);
            cells.value[id] = {
              itemCtx,
              slotName,
            };

            // children.value.push(child);
            // console.log(vm.subTree.children.length);
            // update!
            vm.update();

            const ch = vm.subTree.children as VNode[];

            const vnode = ch.find((vnode) => {
              console.log('checking', vnode.key)
              return vnode.key === `LIST_CELL_${id}`;
            });

            const cellEl = vnode.el.nativeView;
            cellEl[LIST_CELL_ID] = id;
            event.view = cellEl;
            // console.log("FOUND", !!vnode);

            // console.log(
            //   ch.length,
            //   ch[0].type,
            //   ch[0].el?.tagName,
            //   ch[0].el.nativeView
            // );

            // ch[0].el.nativeView[LIST_CELL_ID] = id;
            // console.log(vm.subTree.children[0]);

            // render(cloneVNode(vnodes[0]), container as any);

            // console.log(vnodes[0].el);
            // event.view = vnodes[0].el.nativeView;
            // event.view = container.el.nativeView;
            // event.view = ch[0].el.nativeView;
          },
        },
        // render all realized templates as children
        Object.entries(cells.value).map(([id, child]) => {
          // console.log('rendering id', id)
          const vnodes: VNode[] = ctx.slots[child.slotName](child.itemCtx);

          if (vnodes.length > 1) {
            warn(
              `ListView template must contain a single root element. Found: ${vnodes.length}. Only the first one will be used.`
            );
          }

          const vnode: VNode = vnodes[0];

          vnode.key = `LIST_CELL_${id}`
          // console.log('VNODE', vnode[0].props.text)
          return vnode;
        })
        //.map((vnode) => vnode)
      );
    };
  },
});
