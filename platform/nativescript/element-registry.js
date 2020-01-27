import { registerElement } from './register'
import * as builtInComponents from './runtime/components'

registerElement(
  'ActionBar',
  () => require('@nativescript/core/ui/action-bar').ActionBar,
  {
    removeChild(parent, child) {
      try {
        parent.nativeView._removeView(child.nativeView)
      } catch (e) {
        // ignore exception - child is likely already removed/replaced
        // fixes #76
      }
    },
    component: builtInComponents.ActionBar
  }
)

registerElement(
  'ActionItem',
  () => require('@nativescript/core/ui/action-bar').ActionItem
)

registerElement('android', null, {
  component: builtInComponents.android
})

registerElement('ios', null, {
  component: builtInComponents.ios
})

registerElement(
  'ListView',
  () => require('@nativescript/core/ui/list-view').ListView,
  {
    component: builtInComponents.ListView
  }
)

registerElement(
  'NavigationButton',
  () => require('@nativescript/core/ui/action-bar').NavigationButton
)

registerElement(
  'TabView',
  () => require('@nativescript/core/ui/tab-view').TabView,
  {
    model: {
      prop: 'selectedIndex',
      event: 'selectedIndexChange'
    },
    component: builtInComponents.TabView
  }
)

registerElement(
  'TabViewItem',
  () => require('@nativescript/core/ui/tab-view').TabViewItem,
  {
    skipAddToDom: true,
    component: builtInComponents.TabViewItem
  }
)

registerElement(
  'BottomNavigation',
  () => require('@nativescript/core/ui/bottom-navigation').BottomNavigation,
  {
    model: {
      prop: 'selectedIndex',
      event: 'selectedIndexChange'
    },
    component: builtInComponents.BottomNavigation
  }
)

registerElement('Tabs', () => require('@nativescript/core/ui/tabs').Tabs, {
  model: {
    prop: 'selectedIndex',
    event: 'selectedIndexChange'
  },
  component: builtInComponents.Tabs
})

registerElement(
  'TabStrip',
  () => require('@nativescript/core/ui/tab-navigation-base/tab-strip').TabStrip,
  {
    skipAddToDom: true,
    component: builtInComponents.TabStrip
  }
)

registerElement(
  'TabStripItem',
  () =>
    require('@nativescript/core/ui/tab-navigation-base/tab-strip-item')
      .TabStripItem,
  {
    skipAddToDom: true,
    component: builtInComponents.TabStripItem
  }
)

registerElement(
  'TabContentItem',
  () =>
    require('@nativescript/core/ui/tab-navigation-base/tab-content-item')
      .TabContentItem,
  {
    skipAddToDom: true,
    component: builtInComponents.TabContentItem
  }
)

registerElement('transition', null, {
  component: builtInComponents.transition
})

registerElement('v-template', null, {
  component: builtInComponents.VTemplate
})

// NS components which uses the automatic registerElement Vue wrapper
// as they do not need any special logic

registerElement('Label', () => require('@nativescript/core/ui/label').Label, {
  model: {
    prop: 'text',
    event: 'textChange'
  }
})

registerElement(
  'DatePicker',
  () => require('@nativescript/core/ui/date-picker').DatePicker,
  {
    model: {
      prop: 'date',
      event: 'dateChange'
    }
  }
)

registerElement(
  'AbsoluteLayout',
  () => require('@nativescript/core/ui/layouts/absolute-layout').AbsoluteLayout
)
registerElement(
  'ActivityIndicator',
  () => require('@nativescript/core/ui/activity-indicator').ActivityIndicator
)
registerElement('Border', () => require('@nativescript/core/ui/border').Border)
registerElement('Button', () => require('@nativescript/core/ui/button').Button)
registerElement(
  'ContentView',
  () => require('@nativescript/core/ui/content-view').ContentView
)
registerElement(
  'DockLayout',
  () => require('@nativescript/core/ui/layouts/dock-layout').DockLayout
)
registerElement(
  'GridLayout',
  () => require('@nativescript/core/ui/layouts/grid-layout').GridLayout
)
registerElement(
  'HtmlView',
  () => require('@nativescript/core/ui/html-view').HtmlView
)
registerElement('Image', () => require('@nativescript/core/ui/image').Image)
registerElement('img', () => require('@nativescript/core/ui/image').Image)
registerElement(
  'ListPicker',
  () => require('@nativescript/core/ui/list-picker').ListPicker,
  {
    model: {
      prop: 'selectedIndex',
      event: 'selectedIndexChange'
    }
  }
)
registerElement('Page', () => require('@nativescript/core/ui/page').Page, {
  skipAddToDom: true,
  component: builtInComponents.Page
})

registerElement(
  'Placeholder',
  () => require('@nativescript/core/ui/placeholder').Placeholder
)
registerElement(
  'Progress',
  () => require('@nativescript/core/ui/progress').Progress,
  {
    model: {
      prop: 'value',
      event: 'valueChange'
    }
  }
)
registerElement(
  'ProxyViewContainer',
  () => require('@nativescript/core/ui/proxy-view-container').ProxyViewContainer
)
// registerElement(
//   'Repeater',
//   () => require('@nativescript/core/ui/repeater').Repeater
// )
registerElement(
  'ScrollView',
  () => require('@nativescript/core/ui/scroll-view').ScrollView
)
registerElement(
  'SearchBar',
  () => require('@nativescript/core/ui/search-bar').SearchBar,
  {
    model: {
      prop: 'text',
      event: 'textChange'
    }
  }
)
registerElement(
  'SegmentedBar',
  () => require('@nativescript/core/ui/segmented-bar').SegmentedBar,
  {
    model: {
      prop: 'selectedIndex',
      event: 'selectedIndexChange'
    }
  }
)
registerElement(
  'SegmentedBarItem',
  () => require('@nativescript/core/ui/segmented-bar').SegmentedBarItem
)
registerElement(
  'Slider',
  () => require('@nativescript/core/ui/slider').Slider,
  {
    model: {
      prop: 'value',
      event: 'valueChange'
    }
  }
)
registerElement(
  'StackLayout',
  () => require('@nativescript/core/ui/layouts/stack-layout').StackLayout
)
registerElement(
  'FlexboxLayout',
  () => require('@nativescript/core/ui/layouts/flexbox-layout').FlexboxLayout
)
registerElement(
  'Switch',
  () => require('@nativescript/core/ui/switch').Switch,
  {
    model: {
      prop: 'checked',
      event: 'checkedChange'
    }
  }
)

registerElement(
  'TextField',
  () => require('@nativescript/core/ui/text-field').TextField,
  {
    model: {
      prop: 'text',
      event: 'textChange'
    }
  }
)
registerElement(
  'TextView',
  () => require('@nativescript/core/ui/text-view').TextView,
  {
    model: {
      prop: 'text',
      event: 'textChange'
    }
  }
)
registerElement(
  'TimePicker',
  () => require('@nativescript/core/ui/time-picker').TimePicker,
  {
    model: {
      prop: 'time',
      event: 'timeChange'
    }
  }
)
registerElement(
  'WebView',
  () => require('@nativescript/core/ui/web-view').WebView
)
registerElement(
  'WrapLayout',
  () => require('@nativescript/core/ui/layouts/wrap-layout').WrapLayout
)
registerElement(
  'FormattedString',
  () => require('@nativescript/core/text/formatted-string').FormattedString
)
registerElement('Span', () => require('@nativescript/core/text/span').Span)

registerElement(
  'DetachedContainer',
  () =>
    require('@nativescript/core/ui/proxy-view-container').ProxyViewContainer,
  {
    skipAddToDom: true
  }
)
registerElement(
  'DetachedText',
  () => require('@nativescript/core/ui/placeholder').Placeholder,
  {
    skipAddToDom: true
  }
)
registerElement(
  'Comment',
  () => require('@nativescript/core/ui/placeholder').Placeholder
)

registerElement(
  'Document',
  () =>
    require('@nativescript/core/ui/proxy-view-container').ProxyViewContainer,
  {
    skipAddToDom: true
  }
)

registerElement('Frame', () => require('@nativescript/core/ui/frame').Frame, {
  insertChild(parentNode, childNode, atIndex) {
    // if (normalizeElementName(childNode.tagName) === 'nativepage') {
    // parentNode.nativeView.navigate({ create: () => childNode.nativeView })
    // }
  },
  component: builtInComponents.Frame
})
