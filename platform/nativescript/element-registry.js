import * as builtInComponents from './runtime/components'
import { trace } from './util'

const elementMap = {}
const nativeRegExp = /Native/gi
const dashRegExp = /-/g

const defaultViewMeta = {
  skipAddToDom: false,
  isUnaryTag: false,
  tagNamespace: '',
  canBeLeftOpenTag: false,
  model: null,
  component: null
}

export function normalizeElementName(elementName) {
  return `native${elementName
    .replace(nativeRegExp, '')
    .replace(dashRegExp, '')
    .toLowerCase()}`
}

export function registerElement(elementName, resolver, meta) {
  const normalizedName = normalizeElementName(elementName)

  meta = Object.assign({}, defaultViewMeta, meta)

  // allow override of elements classes (N ones especially)
  // this is very practical in case you want to test new component
  // or simply override the global Button for example
  if (elementMap[normalizedName]) {
    trace(`Element for ${elementName} already registered.`)
  }

  if (!meta.component) {
    // if no Vue component is passed, wrap the simpler vue component
    // which bind the events and attributes to the NS one
    meta.component = {
      functional: true,
      model: meta.model,
      render: (h, { data, children }) => {
        return h(normalizedName, data, children)
      }
    }
  }
  meta.component.name = elementName

  const entry = {
    resolver: resolver,
    meta: meta
  }
  elementMap[normalizedName] = entry
}

export function getElementMap() {
  return elementMap
}

export function getViewClass(elementName) {
  const normalizedName = normalizeElementName(elementName)
  const entry = elementMap[normalizedName]

  if (!entry) {
    throw new TypeError(`No known component for element ${elementName}.`)
  }

  try {
    return entry.resolver()
  } catch (e) {
    throw new TypeError(
      `Could not load view for: ${elementName}. ${e} ${e.stack}`
    )
  }
}

export function getViewMeta(elementName) {
  const normalizedName = normalizeElementName(elementName)

  let meta = defaultViewMeta
  const entry = elementMap[normalizedName]

  if (entry && entry.meta) {
    meta = entry.meta
  }

  return meta
}

export function isKnownView(elementName) {
  return elementMap[normalizeElementName(elementName)]
}

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
