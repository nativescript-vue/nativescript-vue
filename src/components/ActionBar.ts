import {
  ActionBar as NSCActionBar,
  ActionItem as NSCActionItem,
  NavigationButton as NSCNavigationButton,
  Page as NSCPage,
} from '@nativescript/core';
import { defineComponent, h } from '@vue/runtime-core';
import { NSVElement, NSVViewFlags } from '../dom';
import { registerElement } from '../registry';
import { logger } from '../util/logger';

registerElement('NSCActionBar', () => NSCActionBar, {
  viewFlags: NSVViewFlags.SKIP_ADD_TO_DOM,
  nodeOps: {
    insert(child, parent, atIndex) {
      const actionBar = parent.nativeView as NSCActionBar;
      const childView = child.nativeView;

      if (childView instanceof NSCNavigationButton) {
        actionBar.navigationButton = childView;
      } else if (childView instanceof NSCActionItem) {
        if (atIndex) {
          const ai: NSCActionItem[] = actionBar.actionItems.getItems();
          ai.splice(atIndex, 0, childView);
          (actionBar.actionItems as any).setItems(ai);
        } else {
          actionBar.actionItems.addItem(childView);
        }
      } else {
        actionBar.titleView = childView;
      }
    },
    remove(child, parent) {
      const actionBar = parent.nativeView as NSCActionBar;
      const childView = child.nativeView;

      if (childView instanceof NSCNavigationButton) {
        if (actionBar.navigationButton === childView) {
          actionBar.navigationButton = null;
        }
      } else if (childView instanceof NSCActionItem) {
        actionBar.actionItems.removeItem(childView);
      } else {
        if (actionBar.titleView === childView) {
          actionBar.titleView = null;
        }
      }
    },
  },
});

export const ActionBar = /*#__PURE__*/ defineComponent({
  name: 'ActionBar',
  setup(props, ctx) {
    return () => {
      return h(
        'NSCActionBar',
        {
          ...ctx.attrs,
          onVnodeMounted(vnode) {
            const el = vnode.el as NSVElement;
            const actionBar = el.nativeView as NSCActionBar;
            const parent = el.parentNode as NSVElement;

            if (parent.nativeView instanceof NSCPage) {
              parent.nativeView.actionBar = actionBar;
            } else {
              if (__DEV__) {
                logger.warn(
                  `<ActionBar> must be a direct child of a <Page> element - ` +
                    `got <${parent.nativeView.constructor.name}> instead.`,
                );
              }
            }
          },
        },
        ctx.slots.default ? ctx.slots.default() : undefined,
      );
    };
  },
});
