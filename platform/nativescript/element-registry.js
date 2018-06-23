import * as comps from './runtime/components'

const elementMap = new Map()

const defaultViewMeta = {
  skipAddToDom: false,
  isUnaryTag: false,
  tagNamespace: '',
  canBeLeftOpen: false,
  model: {
    prop: 'text',
    event: 'textChange'
  },
  component: null
}

export function normalizeElementName(elementName) {
  return elementName
    .replace('Native', '')
    .replace(/-/g, '')
    .toLowerCase()
}

export function registerElementLegacy(elementName, resolver, meta) {
  elementName = normalizeElementName(elementName)

  meta = Object.assign({}, defaultViewMeta, meta)

  if (elementMap.has(elementName)) {
    throw new Error(`Element for ${elementName} already registered.`)
  }

  const entry = { resolver: resolver, meta: meta }
  elementMap.set(elementName.toLowerCase(), entry)
}

export function registerElement(elementName, resolver, meta) {
  const normalizedName = normalizeElementName(elementName)

  meta = Object.assign({}, defaultViewMeta, meta)

  if (elementMap.has(normalizedName)) {
    throw new Error(`Element for ${elementName} already registered.`)
  }

  if (!meta.component) {
    // if no Vue component is passed, wrap the simpler vue component
    // which bind the events and attributes to the NS one
    meta.component = {
      functional: true,
      render: (h, { data, slots }) => {
        return h(`Native${elementName}`, data, slots().default)
      }
    }
  }
  meta.component.name = elementName

  const entry = {
    resolver: resolver,
    meta: meta
  }
  elementMap.set(normalizedName, entry)
}

export function getElements() {
  return elementMap
}

export function getViewClass(elementName) {
  elementName = normalizeElementName(elementName)
  const entry = elementMap.get(elementName.toLowerCase())

  if (!entry) {
    throw new TypeError(`No known component for element ${elementName}.`)
  }

  try {
    return entry.resolver()
  } catch (e) {
    throw new TypeError(`Could not load view for: ${elementName}. ${e}`)
  }
}

export function getViewMeta(nodeName) {
  nodeName = normalizeElementName(nodeName)

  let meta = defaultViewMeta
  const entry = elementMap.get(nodeName)

  if (entry && entry.meta) {
    meta = entry.meta
  }

  return meta
}

export function isKnownView(elementName) {
  elementName = normalizeElementName(elementName)

  return elementMap.has(elementName)
}

registerElement(
  'ActionBar',
  () => require('tns-core-modules/ui/action-bar').ActionBar,
  {
    removeChild(parent, child) {
      try {
        parent.nativeView._removeView(child.nativeView)
      } catch (e) {
        // ignore exception - child is likely already removed/replaced
        // fixes #76
      }
    },
    component: comps.ActionBar
  }
)

registerElement(
  'ActionItem',
  () => require('tns-core-modules/ui/action-bar').ActionItem,
  {
    component: comps.ActionItem
  }
)

registerElement('android', null, {
  component: comps.android
})

registerElement('ios', null, {
  component: comps.ios
})

registerElement(
  'ListView',
  () => require('tns-core-modules/ui/list-view').ListView,
  {
    component: comps.ListView
  }
)

registerElement(
  'NavigationButton',
  () => require('tns-core-modules/ui/action-bar').NavigationButton,
  {
    component: comps.NavigationButton
  }
)

registerElement(
  'TabView',
  () => require('tns-core-modules/ui/tab-view').TabView,
  {
    model: {
      prop: 'selectedIndex',
      event: 'selectedIndexChange'
    },
    component: comps.TabView
  }
)

registerElement(
  'TabViewItem',
  () => require('tns-core-modules/ui/tab-view').TabViewItem,
  {
    skipAddToDom: true,
    component: comps.TabViewItem
  }
)

registerElement('transition', null, {
  component: comps.transition
})

registerElementLegacy('VTemplate', null, {
  component: comps.VTemplate
})

// NS components which uses the automatic registerElement Vue wrapper
// as they do not need any special logic

registerElement('Label', () => require('tns-core-modules/ui/label').Label)

registerElement(
  'DatePicker',
  () => require('tns-core-modules/ui/date-picker').DatePicker,
  {
    model: {
      prop: 'date',
      event: 'dateChange'
    }
  }
)

registerElementLegacy(
  'AbsoluteLayout',
  () => require('tns-core-modules/ui/layouts/absolute-layout').AbsoluteLayout
)
registerElementLegacy(
  'ActivityIndicator',
  () => require('tns-core-modules/ui/activity-indicator').ActivityIndicator
)
registerElementLegacy(
  'Border',
  () => require('tns-core-modules/ui/border').Border
)
registerElement(
  'Button',
  () => require('tns-core-modules/ui/button').Button,
)
registerElementLegacy(
  'ContentView',
  () => require('tns-core-modules/ui/content-view').ContentView
)
registerElementLegacy(
  'DockLayout',
  () => require('tns-core-modules/ui/layouts/dock-layout').DockLayout
)
registerElementLegacy(
  'GridLayout',
  () => require('tns-core-modules/ui/layouts/grid-layout').GridLayout
)
registerElementLegacy(
  'HtmlView',
  () => require('tns-core-modules/ui/html-view').HtmlView
)
registerElementLegacy('Image', () => require('tns-core-modules/ui/image').Image)
registerElementLegacy('img', () => require('tns-core-modules/ui/image').Image)
registerElementLegacy(
  'ListPicker',
  () => require('tns-core-modules/ui/list-picker').ListPicker,
  {
    model: {
      prop: 'selectedIndex',
      event: 'selectedIndexChange'
    }
  }
)
registerElementLegacy('Page', () => require('tns-core-modules/ui/page').Page, {
  skipAddToDom: true
})
registerElementLegacy(
  'Placeholder',
  () => require('tns-core-modules/ui/placeholder').Placeholder
)
registerElementLegacy(
  'Progress',
  () => require('tns-core-modules/ui/progress').Progress
)
registerElementLegacy(
  'ProxyViewContainer',
  () => require('tns-core-modules/ui/proxy-view-container').ProxyViewContainer
)
registerElementLegacy(
  'Repeater',
  () => require('tns-core-modules/ui/repeater').Repeater
)
registerElementLegacy(
  'ScrollView',
  () => require('tns-core-modules/ui/scroll-view').ScrollView
)
registerElementLegacy(
  'SearchBar',
  () => require('tns-core-modules/ui/search-bar').SearchBar,
  {
    model: {
      prop: 'text',
      event: 'textChange'
    }
  }
)
registerElementLegacy(
  'SegmentedBar',
  () => require('tns-core-modules/ui/segmented-bar').SegmentedBar,
  {
    model: {
      prop: 'selectedIndex',
      event: 'selectedIndexChange'
    }
  }
)
registerElementLegacy(
  'SegmentedBarItem',
  () => require('tns-core-modules/ui/segmented-bar').SegmentedBarItem
)
registerElementLegacy(
  'Slider',
  () => require('tns-core-modules/ui/slider').Slider,
  {
    model: {
      prop: 'value',
      event: 'valueChange'
    }
  }
)
registerElementLegacy(
  'StackLayout',
  () => require('tns-core-modules/ui/layouts/stack-layout').StackLayout
)
registerElementLegacy(
  'FlexboxLayout',
  () => require('tns-core-modules/ui/layouts/flexbox-layout').FlexboxLayout
)
registerElementLegacy(
  'Switch',
  () => require('tns-core-modules/ui/switch').Switch,
  {
    model: {
      prop: 'checked',
      event: 'checkedChange'
    }
  }
)

registerElementLegacy(
  'TextField',
  () => require('tns-core-modules/ui/text-field').TextField
)
registerElementLegacy(
  'TextView',
  () => require('tns-core-modules/ui/text-view').TextView
)
registerElementLegacy(
  'TimePicker',
  () => require('tns-core-modules/ui/time-picker').TimePicker,
  {
    model: {
      prop: 'time',
      event: 'timeChange'
    }
  }
)
registerElementLegacy(
  'WebView',
  () => require('tns-core-modules/ui/web-view').WebView
)
registerElementLegacy(
  'WrapLayout',
  () => require('tns-core-modules/ui/layouts/wrap-layout').WrapLayout
)
registerElementLegacy(
  'FormattedString',
  () => require('tns-core-modules/text/formatted-string').FormattedString
)
registerElementLegacy('Span', () => require('tns-core-modules/text/span').Span)

registerElementLegacy(
  'DetachedContainer',
  () => require('tns-core-modules/ui/proxy-view-container').ProxyViewContainer,
  {
    skipAddToDom: true
  }
)
registerElementLegacy(
  'DetachedText',
  () => require('tns-core-modules/ui/placeholder').Placeholder,
  {
    skipAddToDom: true
  }
)
registerElementLegacy(
  'Comment',
  () => require('tns-core-modules/ui/placeholder').Placeholder
)

registerElementLegacy(
  'Document',
  () => require('tns-core-modules/ui/proxy-view-container').ProxyViewContainer,
  {
    skipAddToDom: true
  }
)

registerElementLegacy(
  'Frame',
  () => require('tns-core-modules/ui/frame').Frame,
  {
    insertChild(parentNode, childNode, atIndex) {
      if (childNode.tagName === 'page') {
        parentNode.nativeView.navigate({ create: () => childNode.nativeView })
      }
    }
  }
)
