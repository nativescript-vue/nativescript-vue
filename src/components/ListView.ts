import { defineComponent, h, warn } from "@vue/runtime-core";

import { ItemEventData, ListView as NSCListView } from "@nativescript/core";

import { registerElement } from "../registry";
import { NSVElement, NSVRoot, NSVViewFlags } from "../dom";
import { render } from "..";
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

export const ListView = defineComponent({
  props: ["items"],

  setup(props, ctx) {
    console.log(props, ctx);
    console.log(ctx.slots);
    console.log();

    return () => {
      return h("NSCListView", {
        items: props.items,
        [`on${NSCListView.itemLoadingEvent}`](event: ItemEventData) {
          const el = event.view?.[ELEMENT_REF] as NSVElement;
          const container = (el?.parentNode as NSVRoot) ?? new NSVRoot();

          const slot = ctx.slots.default({
            item: props.items[event.index],
            index: event.index,
            even: event.index % 2 === 0,
            odd: event.index % 2 !== 0,
          });

          if (slot.length > 1) {
            warn(
              `ListView template must contain a single root element. Found: ${slot.length}. Only the first one will be used.`
            );
          }
          render(slot[0], container as any);
          event.view = container.el.nativeView;
        },
      });
    };
  },
});
