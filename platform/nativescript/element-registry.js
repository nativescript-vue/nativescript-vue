const elementMap = new Map()

const defaultViewMeta = {
  skipAddToDom: false,
  isUnaryTag: false,
  tagNamespace: '',
  canBeLeftOpen: false,
  model: {
    prop: 'text',
    event: 'textChange'
  }
}

export function normalizeElementName(elementName) {
  return elementName.replace(/-/g, '').toLowerCase()
}

export function registerElement(elementName, resolver, meta) {
  elementName = normalizeElementName(elementName)

  meta = Object.assign({}, defaultViewMeta, meta)

  if (elementMap.has(elementName)) {
    throw new Error(`Element for ${elementName} already registered.`)
  }

  const entry = { resolver: resolver, meta: meta }
  elementMap.set(elementName.toLowerCase(), entry)
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
  const entry = elementMap.get(nodeName.toLowerCase())

  if (entry && entry.meta) {
    meta = entry.meta
  }

  return meta
}

export function isKnownView(elementName) {
  elementName = normalizeElementName(elementName)

  return elementMap.has(elementName.toLowerCase())
}

registerElement(
  'AbsoluteLayout',
  () => require('tns-core-modules/ui/layouts/absolute-layout').AbsoluteLayout
)
registerElement(
  'ActivityIndicator',
  () => require('tns-core-modules/ui/activity-indicator').ActivityIndicator
)
registerElement('Border', () => require('tns-core-modules/ui/border').Border)
registerElement('Button', () => require('tns-core-modules/ui/button').Button)
registerElement(
  'ContentView',
  () => require('tns-core-modules/ui/content-view').ContentView
)
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
registerElement(
  'DockLayout',
  () => require('tns-core-modules/ui/layouts/dock-layout').DockLayout
)
registerElement(
  'GridLayout',
  () => require('tns-core-modules/ui/layouts/grid-layout').GridLayout
)
registerElement(
  'HtmlView',
  () => require('tns-core-modules/ui/html-view').HtmlView
)
registerElement('Image', () => require('tns-core-modules/ui/image').Image)
registerElement('img', () => require('tns-core-modules/ui/image').Image)
registerElement('Label', () => require('tns-core-modules/ui/label').Label)
registerElement(
  'ListPicker',
  () => require('tns-core-modules/ui/list-picker').ListPicker,
  {
    model: {
      prop: 'selectedIndex',
      event: 'selectedIndexChange'
    }
  }
)
registerElement(
  'NativeActionBar',
  () => require('tns-core-modules/ui/action-bar').ActionBar
)
registerElement(
  'NativeActionItem',
  () => require('tns-core-modules/ui/action-bar').ActionItem
)
registerElement(
  'NativeListView',
  () => require('tns-core-modules/ui/list-view').ListView
)
registerElement(
  'NativeNavigationButton',
  () => require('tns-core-modules/ui/action-bar').NavigationButton
)
registerElement('Page', () => require('tns-core-modules/ui/page').Page, {
  skipAddToDom: true
})
registerElement(
  'Placeholder',
  () => require('tns-core-modules/ui/placeholder').Placeholder
)
registerElement(
  'Progress',
  () => require('tns-core-modules/ui/progress').Progress
)
registerElement(
  'ProxyViewContainer',
  () => require('tns-core-modules/ui/proxy-view-container').ProxyViewContainer
)
registerElement(
  'Repeater',
  () => require('tns-core-modules/ui/repeater').Repeater
)
registerElement(
  'ScrollView',
  () => require('tns-core-modules/ui/scroll-view').ScrollView
)
registerElement(
  'SearchBar',
  () => require('tns-core-modules/ui/search-bar').SearchBar,
  {
    model: {
      prop: 'text',
      event: 'textChange'
    }
  }
)
registerElement(
  'SegmentedBar',
  () => require('tns-core-modules/ui/segmented-bar').SegmentedBar,
  {
    model: {
      prop: 'selectedIndex',
      event: 'selectedIndexChange'
    }
  }
)
registerElement(
  'SegmentedBarItem',
  () => require('tns-core-modules/ui/segmented-bar').SegmentedBarItem
)
registerElement('Slider', () => require('tns-core-modules/ui/slider').Slider, {
  model: {
    prop: 'value',
    event: 'valueChange'
  }
})
registerElement(
  'StackLayout',
  () => require('tns-core-modules/ui/layouts/stack-layout').StackLayout
)
registerElement(
  'FlexboxLayout',
  () => require('tns-core-modules/ui/layouts/flexbox-layout').FlexboxLayout
)
registerElement('Switch', () => require('tns-core-modules/ui/switch').Switch, {
  model: {
    prop: 'checked',
    event: 'checkedChange'
  }
})

registerElement(
  'NativeTabView',
  () => require('tns-core-modules/ui/tab-view').TabView,
  {
    model: {
      prop: 'selectedIndex',
      event: 'selectedIndexChange'
    }
  }
)
registerElement(
  'NativeTabViewItem',
  () => require('tns-core-modules/ui/tab-view').TabViewItem,
  {
    skipAddToDom: true
  }
)

registerElement(
  'TextField',
  () => require('tns-core-modules/ui/text-field').TextField
)
registerElement(
  'TextView',
  () => require('tns-core-modules/ui/text-view').TextView
)
registerElement(
  'TimePicker',
  () => require('tns-core-modules/ui/time-picker').TimePicker,
  {
    model: {
      prop: 'time',
      event: 'timeChange'
    }
  }
)
registerElement(
  'WebView',
  () => require('tns-core-modules/ui/web-view').WebView
)
registerElement(
  'WrapLayout',
  () => require('tns-core-modules/ui/layouts/wrap-layout').WrapLayout
)
registerElement(
  'FormattedString',
  () => require('text/formatted-string').FormattedString
)
registerElement('Span', () => require('text/span').Span)

registerElement(
  'DetachedContainer',
  () => require('tns-core-modules/ui/proxy-view-container').ProxyViewContainer,
  {
    skipAddToDom: true
  }
)
registerElement(
  'DetachedText',
  () => require('tns-core-modules/ui/placeholder').Placeholder,
  {
    skipAddToDom: true
  }
)
registerElement(
  'Comment',
  () => require('tns-core-modules/ui/placeholder').Placeholder
)
registerElement(
  'Document',
  () => require('tns-core-modules/ui/proxy-view-container').ProxyViewContainer,
  {
    skipAddToDom: true
  }
)
