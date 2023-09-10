import { Frame as NSCFrame, Page as NSCPage } from '@nativescript/core';

import { warn } from '@vue/runtime-core';

import { NSVElement, NSVViewFlags } from '../dom';
import { registerElement } from '../registry';

export function registerCoreElements() {
  // layouts
  registerElement(
    'AbsoluteLayout',
    () => require('@nativescript/core').AbsoluteLayout,
    { viewFlags: NSVViewFlags.LAYOUT_VIEW },
  );
  registerElement(
    'DockLayout',
    () => require('@nativescript/core').DockLayout,
    {
      viewFlags: NSVViewFlags.LAYOUT_VIEW,
    },
  );
  registerElement(
    'FlexboxLayout',
    () => require('@nativescript/core').FlexboxLayout,
    { viewFlags: NSVViewFlags.LAYOUT_VIEW },
  );
  registerElement(
    'GridLayout',
    () => require('@nativescript/core').GridLayout,
    {
      viewFlags: NSVViewFlags.LAYOUT_VIEW,
    },
  );
  registerElement(
    'RootLayout',
    () => require('@nativescript/core').RootLayout,
    {
      viewFlags: NSVViewFlags.LAYOUT_VIEW,
    },
  );
  registerElement(
    'StackLayout',
    () => require('@nativescript/core').StackLayout,
    { viewFlags: NSVViewFlags.LAYOUT_VIEW },
  );
  registerElement(
    'WrapLayout',
    () => require('@nativescript/core').WrapLayout,
    {
      viewFlags: NSVViewFlags.LAYOUT_VIEW,
    },
  );

  // ContentViews
  registerElement(
    'ContentView',
    () => require('@nativescript/core').ContentView,
    { viewFlags: NSVViewFlags.CONTENT_VIEW },
  );
  registerElement(
    'ScrollView',
    () => require('@nativescript/core').ScrollView,
    {
      viewFlags: NSVViewFlags.CONTENT_VIEW,
    },
  );

  // ActionBar
  registerElement('ActionItem', () => require('@nativescript/core').ActionItem);
  registerElement(
    'NavigationButton',
    () => require('@nativescript/core').NavigationButton,
  );

  // navigation
  registerElement('Frame', () => require('@nativescript/core').Frame, {
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
            warn(
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
  registerElement('Page', () => require('@nativescript/core').Page, {
    viewFlags: NSVViewFlags.CONTENT_VIEW,
  });

  // html
  registerElement('HtmlView', () => require('@nativescript/core').HtmlView);
  registerElement('WebView', () => require('@nativescript/core').WebView);

  // components
  registerElement(
    'ActivityIndicator',
    () => require('@nativescript/core').ActivityIndicator,
  );
  registerElement('Button', () => require('@nativescript/core').Button);
  registerElement(
    'DatePicker',
    () => require('@nativescript/core').DatePicker,
    {
      model: {
        prop: 'date',
        event: 'dateChange',
      },
    },
  );
  registerElement(
    'FormattedString',
    () => require('@nativescript/core').FormattedString,
    {
      nodeOps: {
        insert(child, parent, atIndex) {
          if (atIndex) {
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
    },
  );
  registerElement('Image', () => require('@nativescript/core').Image);
  registerElement('Label', () => require('@nativescript/core').Label);
  registerElement(
    'ListPicker',
    () => require('@nativescript/core').ListPicker,
    {
      model: {
        prop: 'selectedIndex',
        event: 'selectedIndexChange',
      },
    },
  );
  registerElement(
    'Placeholder',
    () => require('@nativescript/core').Placeholder,
  );
  registerElement('Progress', () => require('@nativescript/core').Progress);
  registerElement('SearchBar', () => require('@nativescript/core').SearchBar, {
    model: {
      prop: 'text',
      event: 'textChange',
    },
  });
  registerElement(
    'SegmentedBar',
    () => require('@nativescript/core').SegmentedBar,
    {
      model: {
        prop: 'selectedIndex',
        event: 'selectedIndexChange',
      },
    },
  );
  registerElement(
    'SegmentedBarItem',
    () => require('@nativescript/core').SegmentedBarItem,
  );
  registerElement('Slider', () => require('@nativescript/core').Slider, {
    model: {
      prop: 'value',
      event: 'valueChange',
    },
  });
  registerElement('Span', () => require('@nativescript/core').Span);
  registerElement('Switch', () => require('@nativescript/core').Switch, {
    model: {
      prop: 'checked',
      event: 'checkedChange',
    },
  });
  registerElement('TextField', () => require('@nativescript/core').TextField, {
    model: {
      prop: 'text',
      event: 'textChange',
    },
  });
  registerElement('TextView', () => require('@nativescript/core').TextView, {
    model: {
      prop: 'text',
      event: 'textChange',
    },
  });
  registerElement(
    'TimePicker',
    () => require('@nativescript/core').TimePicker,
    {
      model: {
        prop: 'time',
        event: 'timeChange',
      },
    },
  );
}
