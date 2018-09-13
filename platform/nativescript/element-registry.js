import * as builtInComponents from './runtime/components'

const elementMap = {}
const nativeRegExp = /Native/gi
const dashRegExp = /-/g

const defaultViewMeta = {
  skipAddToDom: false,
  isUnaryTag: false,
  tagNamespace: '',
  canBeLeftOpen: false,
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

  if (elementMap[normalizedName]) {
    throw new Error(`Element for ${elementName} already registered.`)
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
    throw new TypeError(`Could not load view for: ${elementName}. ${e}`)
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
    component: builtInComponents.ActionBar
  }
)

registerElement(
  'ActionItem',
  () => require('tns-core-modules/ui/action-bar').ActionItem
)

registerElement('android', null, {
  component: builtInComponents.android
})

registerElement('ios', null, {
  component: builtInComponents.ios
})

registerElement(
  'ListView',
  () => require('tns-core-modules/ui/list-view').ListView,
  {
    component: builtInComponents.ListView
  }
)

registerElement(
  'NavigationButton',
  () => require('tns-core-modules/ui/action-bar').NavigationButton
)

registerElement(
  'TabView',
  () => require('tns-core-modules/ui/tab-view').TabView,
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
  () => require('tns-core-modules/ui/tab-view').TabViewItem,
  {
    skipAddToDom: true,
    component: builtInComponents.TabViewItem
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

registerElement('Label', () => require('tns-core-modules/ui/label').Label, {
  model: {
    prop: 'text',
    event: 'textChange'
  }
})

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
registerElement('Page', () => require('tns-core-modules/ui/page').Page, {
  skipAddToDom: true,
  component: builtInComponents.Page
})

registerElement(
  'Placeholder',
  () => require('tns-core-modules/ui/placeholder').Placeholder
)
registerElement(
  'Progress',
  () => require('tns-core-modules/ui/progress').Progress,
  {
    model: {
      prop: 'value',
      event: 'valueChange'
    }
  }
)
registerElement(
  'ProxyViewContainer',
  () => require('tns-core-modules/ui/proxy-view-container').ProxyViewContainer
)
// registerElement(
//   'Repeater',
//   () => require('tns-core-modules/ui/repeater').Repeater
// )
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
  'TextField',
  () => require('tns-core-modules/ui/text-field').TextField,
  {
    model: {
      prop: 'text',
      event: 'textChange'
    }
  }
)
registerElement(
  'TextView',
  () => require('tns-core-modules/ui/text-view').TextView,
  {
    model: {
      prop: 'text',
      event: 'textChange'
    }
  }
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
  () => require('tns-core-modules/text/formatted-string').FormattedString
)
registerElement('Span', () => require('tns-core-modules/text/span').Span)

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

registerElement('Frame', () => require('tns-core-modules/ui/frame').Frame, {
  insertChild(parentNode, childNode, atIndex) {
    // if (normalizeElementName(childNode.tagName) === 'nativepage') {
    // parentNode.nativeView.navigate({ create: () => childNode.nativeView })
    // }
  },
  component: builtInComponents.Frame
})
