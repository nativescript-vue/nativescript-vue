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

  elementMap[normalizedName] = {
    resolver: resolver,
    meta: meta
  }
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

registerElement('ActionBar', () => require('@nativescript/core').ActionBar, {
  removeChild(parent, child) {
    try {
      parent.nativeView._removeView(child.nativeView)
    } catch (e) {
      // ignore exception - child is likely already removed/replaced
      // fixes #76
    }
  },
  component: builtInComponents.ActionBar
})

registerElement('ActionItem', () => require('@nativescript/core').ActionItem)

registerElement('android', null, {
  component: builtInComponents.android
})

registerElement('ios', null, {
  component: builtInComponents.ios
})

registerElement('ListView', () => require('@nativescript/core').ListView, {
  component: builtInComponents.ListView
})

registerElement(
  'NavigationButton',
  () => require('@nativescript/core').NavigationButton
)

registerElement('TabView', () => require('@nativescript/core').TabView, {
  model: {
    prop: 'selectedIndex',
    event: 'selectedIndexChange'
  },
  component: builtInComponents.TabView
})

registerElement(
  'TabViewItem',
  () => require('@nativescript/core').TabViewItem,
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

registerElement('Label', () => require('@nativescript/core').Label, {
  model: {
    prop: 'text',
    event: 'textChange'
  }
})

registerElement('DatePicker', () => require('@nativescript/core').DatePicker, {
  model: {
    prop: 'date',
    event: 'dateChange'
  }
})

registerElement(
  'AbsoluteLayout',
  () => require('@nativescript/core').AbsoluteLayout
)
registerElement(
  'ActivityIndicator',
  () => require('@nativescript/core').ActivityIndicator
)
registerElement('Button', () => require('@nativescript/core').Button)
registerElement('ContentView', () => require('@nativescript/core').ContentView)
registerElement('DockLayout', () => require('@nativescript/core').DockLayout)
registerElement('GridLayout', () => require('@nativescript/core').GridLayout)
registerElement('HtmlView', () => require('@nativescript/core').HtmlView)
registerElement('Image', () => require('@nativescript/core').Image)
registerElement('img', () => require('@nativescript/core').Image)
registerElement('ListPicker', () => require('@nativescript/core').ListPicker, {
  model: {
    prop: 'selectedIndex',
    event: 'selectedIndexChange'
  }
})
registerElement('Page', () => require('@nativescript/core').Page, {
  skipAddToDom: true,
  component: builtInComponents.Page
})

registerElement('Placeholder', () => require('@nativescript/core').Placeholder)
registerElement('Progress', () => require('@nativescript/core').Progress, {
  model: {
    prop: 'value',
    event: 'valueChange'
  }
})
registerElement(
  'ProxyViewContainer',
  () => require('@nativescript/core').ProxyViewContainer
)
// registerElement(
//   'Repeater',
//   () => require('@nativescript/core').Repeater
// )
registerElement('RootLayout', () => require('@nativescript/core').RootLayout)
registerElement('ScrollView', () => require('@nativescript/core').ScrollView)
registerElement('SearchBar', () => require('@nativescript/core').SearchBar, {
  model: {
    prop: 'text',
    event: 'textChange'
  }
})
registerElement(
  'SegmentedBar',
  () => require('@nativescript/core').SegmentedBar,
  {
    model: {
      prop: 'selectedIndex',
      event: 'selectedIndexChange'
    }
  }
)
registerElement(
  'SegmentedBarItem',
  () => require('@nativescript/core').SegmentedBarItem
)
registerElement('Slider', () => require('@nativescript/core').Slider, {
  model: {
    prop: 'value',
    event: 'valueChange'
  }
})
registerElement('StackLayout', () => require('@nativescript/core').StackLayout)
registerElement(
  'FlexboxLayout',
  () => require('@nativescript/core').FlexboxLayout
)
registerElement('Switch', () => require('@nativescript/core').Switch, {
  model: {
    prop: 'checked',
    event: 'checkedChange'
  }
})

registerElement('TextField', () => require('@nativescript/core').TextField, {
  model: {
    prop: 'text',
    event: 'textChange'
  }
})
registerElement('TextView', () => require('@nativescript/core').TextView, {
  model: {
    prop: 'text',
    event: 'textChange'
  }
})
registerElement('TimePicker', () => require('@nativescript/core').TimePicker, {
  model: {
    prop: 'time',
    event: 'timeChange'
  }
})
registerElement('WebView', () => require('@nativescript/core').WebView)
registerElement('WrapLayout', () => require('@nativescript/core').WrapLayout)
registerElement(
  'FormattedString',
  () => require('@nativescript/core').FormattedString,
  {
    insertChild(parentNode, childNode, atIndex) {
      if (atIndex > -1) {
        parentNode.nativeView.spans.splice(atIndex, 0, childNode.nativeView)
        return
      }
      parentNode.nativeView.spans.push(childNode.nativeView)
    },
    removeChild(parentNode, childNode) {
      const index = parentNode.nativeView.spans.indexOf(childNode.nativeView)

      if (index > -1) {
        parentNode.nativeView.spans.splice(index, 1)
      }
    }
  }
)
registerElement('Span', () => require('@nativescript/core').Span)

registerElement(
  'DetachedContainer',
  () => require('@nativescript/core').ProxyViewContainer,
  {
    skipAddToDom: true
  }
)
registerElement(
  'DetachedText',
  () => require('@nativescript/core').Placeholder,
  {
    skipAddToDom: true
  }
)
registerElement('Comment', () => require('@nativescript/core').Placeholder)

registerElement(
  'Document',
  () => require('@nativescript/core').ProxyViewContainer,
  {
    skipAddToDom: true
  }
)

registerElement('Frame', () => require('@nativescript/core').Frame, {
  insertChild(parentNode, childNode, atIndex) {
    // if (normalizeElementName(childNode.tagName) === 'nativepage') {
    // parentNode.nativeView.navigate({ create: () => childNode.nativeView })
    // }
  },
  component: builtInComponents.Frame
})
