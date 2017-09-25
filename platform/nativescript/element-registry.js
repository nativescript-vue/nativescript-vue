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
  () => require('ui/layouts/absolute-layout').AbsoluteLayout
)
registerElement(
  'ActivityIndicator',
  () => require('ui/activity-indicator').ActivityIndicator
)
registerElement('Border', () => require('ui/border').Border)
registerElement('Button', () => require('ui/button').Button)
registerElement('ContentView', () => require('ui/content-view').ContentView)
registerElement('DatePicker', () => require('ui/date-picker').DatePicker, {
  model: {
    prop: 'date',
    event: 'dateChange'
  }
})
registerElement(
  'DockLayout',
  () => require('ui/layouts/dock-layout').DockLayout
)
registerElement(
  'GridLayout',
  () => require('ui/layouts/grid-layout').GridLayout
)
registerElement('HtmlView', () => require('ui/html-view').HtmlView)
registerElement('Image', () => require('ui/image').Image)
registerElement('img', () => require('ui/image').Image)
registerElement('Label', () => require('ui/label').Label)
registerElement('ListPicker', () => require('ui/list-picker').ListPicker, {
  model: {
    prop: 'selectedIndex',
    event: 'selectedIndexChange'
  }
})
registerElement('NativeActionBar', () => require('ui/action-bar').ActionBar)
registerElement('NativeActionItem', () => require('ui/action-bar').ActionItem)
registerElement('NativeListView', () => require('ui/list-view').ListView)
registerElement(
  'NativeNavigationButton',
  () => require('ui/action-bar').NavigationButton
)
registerElement('Page', () => require('ui/page').Page, {
  skipAddToDom: true
})
registerElement('Placeholder', () => require('ui/placeholder').Placeholder)
registerElement('Progress', () => require('ui/progress').Progress)
registerElement(
  'ProxyViewContainer',
  () => require('ui/proxy-view-container').ProxyViewContainer
)
registerElement('Repeater', () => require('ui/repeater').Repeater)
registerElement('ScrollView', () => require('ui/scroll-view').ScrollView)
registerElement('SearchBar', () => require('ui/search-bar').SearchBar)
registerElement(
  'SegmentedBar',
  () => require('ui/segmented-bar').SegmentedBar,
  {
    model: {
      prop: 'selectedIndex',
      event: 'selectedIndexChange'
    }
  }
)
registerElement(
  'SegmentedBarItem',
  () => require('ui/segmented-bar').SegmentedBarItem
)
registerElement('Slider', () => require('ui/slider').Slider, {
  model: {
    prop: 'value',
    event: 'valueChange'
  }
})
registerElement(
  'StackLayout',
  () => require('ui/layouts/stack-layout').StackLayout
)
registerElement(
  'FlexboxLayout',
  () => require('ui/layouts/flexbox-layout').FlexboxLayout
)
registerElement('Switch', () => require('ui/switch').Switch, {
  model: {
    prop: 'checked',
    event: 'checkedChange'
  }
})

registerElement('NativeTabView', () => require('ui/tab-view').TabView, {
  model: {
    prop: 'selectedIndex',
    event: 'selectedIndexChange'
  }
})
registerElement('NativeTabViewItem', () => require('ui/tab-view').TabViewItem, {
  skipAddToDom: true
})

registerElement('TextField', () => require('ui/text-field').TextField)
registerElement('TextView', () => require('ui/text-view').TextView)
registerElement('TimePicker', () => require('ui/time-picker').TimePicker, {
  model: {
    prop: 'time',
    event: 'timeChange'
  }
})
registerElement('WebView', () => require('ui/web-view').WebView)
registerElement(
  'WrapLayout',
  () => require('ui/layouts/wrap-layout').WrapLayout
)
registerElement(
  'FormattedString',
  () => require('text/formatted-string').FormattedString
)
registerElement('Span', () => require('text/span').Span)

registerElement(
  'DetachedContainer',
  () => require('ui/proxy-view-container').ProxyViewContainer,
  {
    skipAddToDom: true
  }
)
registerElement('DetachedText', () => require('ui/placeholder').Placeholder, {
  skipAddToDom: true
})
registerElement('Comment', () => require('ui/placeholder').Placeholder)
registerElement(
  'Document',
  () => require('ui/proxy-view-container').ProxyViewContainer,
  {
    skipAddToDom: true
  }
)
