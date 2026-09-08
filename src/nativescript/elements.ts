import * as NSCore from '@nativescript/core';
import {
  Frame as NSCFrame,
  Page as NSCPage,
  TabView as NSCTabView,
  TabViewItem as NSCTabViewItem,
} from '@nativescript/core';

import { NSVElement, NSVViewFlags } from '../dom';
import { registerElement } from '../registry';
import { logger } from '../util/logger';

export function registerCoreElements() {
  // layouts
  registerElement('AbsoluteLayout', () => NSCore.AbsoluteLayout, {
    viewFlags: NSVViewFlags.LAYOUT_VIEW,
  });
  registerElement('DockLayout', () => NSCore.DockLayout, {
    viewFlags: NSVViewFlags.LAYOUT_VIEW,
  });
  registerElement('FlexboxLayout', () => NSCore.FlexboxLayout, {
    viewFlags: NSVViewFlags.LAYOUT_VIEW,
  });
  registerElement('GridLayout', () => NSCore.GridLayout, {
    viewFlags: NSVViewFlags.LAYOUT_VIEW,
  });
  registerElement('RootLayout', () => NSCore.RootLayout, {
    viewFlags: NSVViewFlags.LAYOUT_VIEW,
  });
  registerElement('StackLayout', () => NSCore.StackLayout, {
    viewFlags: NSVViewFlags.LAYOUT_VIEW,
  });
  registerElement('WrapLayout', () => NSCore.WrapLayout, {
    viewFlags: NSVViewFlags.LAYOUT_VIEW,
  });

  // ContentViews
  registerElement('ContentView', () => NSCore.ContentView, {
    viewFlags: NSVViewFlags.CONTENT_VIEW,
  });
  registerElement('ScrollView', () => NSCore.ScrollView, {
    viewFlags: NSVViewFlags.CONTENT_VIEW,
  });

  // ActionBar
  registerElement('ActionItem', () => NSCore.ActionItem);
  registerElement('NavigationButton', () => NSCore.NavigationButton);

  // navigation
  registerElement('Frame', () => NSCore.Frame, {
    // todo: move into Frame.ts when we end up creating a component for Frame
    nodeOps: {
      insert(child: NSVElement, parent: NSVElement, atIndex?: number): void {
        const frame = parent.nativeView as NSCFrame;
        if (child.nativeView instanceof NSCPage) {
          frame.navigate({
            create() {
              return child.nativeView;
            },
          });
        } else {
          if (__DEV__) {
            logger.warn(
              `<Frame> must only contain <Page> elements - ` +
                `got <${child.nativeView.constructor.name}> instead.`,
            );
          }
        }
      },
      remove(child: NSVElement, parent: NSVElement): void {
        // ignore? warn? throw? navigate back?
        // console.log("REMOVE CHILD FROM FRAME", child);
      },
    },
  });
  registerElement('Page', () => NSCore.Page, {
    viewFlags: NSVViewFlags.CONTENT_VIEW,
  });

  // html
  registerElement('HtmlView', () => NSCore.HtmlView);
  registerElement('WebView', () => NSCore.WebView);

  // components
  registerElement('ActivityIndicator', () => NSCore.ActivityIndicator);
  registerElement('Button', () => NSCore.Button);
  registerElement('DatePicker', () => NSCore.DatePicker, {
    model: {
      prop: 'date',
      event: 'dateChange',
    },
  });
  registerElement('FormattedString', () => NSCore.FormattedString, {
    nodeOps: {
      insert(child, parent, atIndex) {
        if (typeof atIndex === 'number') {
          parent.nativeView.spans.splice(atIndex, 0, child.nativeView);
          return;
        }
        parent.nativeView.spans.push(child.nativeView);
      },
      remove(child, parent) {
        const index = parent.nativeView.spans.indexOf(child.nativeView);

        if (index > -1) {
          parent.nativeView.spans.splice(index, 1);
        }
      },
    },
  });
  registerElement('Image', () => NSCore.Image);
  registerElement('Label', () => NSCore.Label);
  registerElement('ListPicker', () => NSCore.ListPicker, {
    model: {
      prop: 'selectedIndex',
      event: 'selectedIndexChange',
    },
  });
  registerElement('Placeholder', () => NSCore.Placeholder);
  registerElement('Progress', () => NSCore.Progress);
  registerElement('ProxyViewContainer', () => NSCore.ProxyViewContainer);
  registerElement('SearchBar', () => NSCore.SearchBar, {
    model: {
      prop: 'text',
      event: 'textChange',
    },
  });
  registerElement('SegmentedBar', () => NSCore.SegmentedBar, {
    model: {
      prop: 'selectedIndex',
      event: 'selectedIndexChange',
    },
  });
  registerElement('SegmentedBarItem', () => NSCore.SegmentedBarItem);
  registerElement('Slider', () => NSCore.Slider, {
    model: {
      prop: 'value',
      event: 'valueChange',
    },
  });
  registerElement('Span', () => NSCore.Span);
  registerElement('Switch', () => NSCore.Switch, {
    model: {
      prop: 'checked',
      event: 'checkedChange',
    },
  });
  registerElement('TextField', () => NSCore.TextField, {
    model: {
      prop: 'text',
      event: 'textChange',
    },
  });
  registerElement('TextView', () => NSCore.TextView, {
    model: {
      prop: 'text',
      event: 'textChange',
    },
  });
  registerElement('TimePicker', () => NSCore.TimePicker, {
    model: {
      prop: 'time',
      event: 'timeChange',
    },
  });

  registerElement('TabViewItem', () => NSCore.TabViewItem);

  registerElement('TabView', () => NSCore.TabView, {
    model: {
      prop: 'selectedIndex',
      event: 'selectedIndexChange',
    },
    nodeOps: {
      insert(child, parent, atIndex) {
        const tabView = parent.nativeView as NSCTabView;

        if (child.nativeView instanceof NSCTabViewItem) {
          const items = [...(tabView.items || [])];
          items.splice(atIndex ?? items.length, 0, child.nativeView);

          parent.setAttribute('items', items);
        }
      },
      remove(child, parent) {
        const tabView = parent.nativeView as NSCTabView;
        const items = (tabView.items || []).filter(
          (item) => item !== child.nativeView,
        );

        parent.setAttribute('items', items);
      },
    },
  });
}
