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
  }
}

function getNSElementName(elementName) {
  return `Native${elementName}`
}

export function normalizeElementName(elementName) {
  return elementName.replace(/-/g, '').toLowerCase()
}

export function registerElement(elementName, resolver, meta, component) {
  const normalizedName = normalizeElementName(elementName)
  const nsElementName = getNSElementName(elementName)

  meta = Object.assign({}, defaultViewMeta, meta)

  if (elementMap.has(normalizedName)) {
    throw new Error(`Element for ${elementName} already registered.`)
  }

  if (!component) {
    // if no Vue component is passed, wrap the simpler vue component
    // which bind the events and attributes to the NS one
    let modelTpl = ''
    const tagName = 'native-' + elementName.toLowerCase()

    if (meta.model) {
      const model = meta.model
      modelTpl = `
        v-bind:${model.prop}="value"
        v-on:${model.event}="emitInput"
      `
    }

    component = {
      template: `
        <${tagName}
          ref="${elementName}"
          ${modelTpl}
          v-bind="$attrs"
          v-on="$listeners">
          <slot></slot>
        </${tagName}>
      `,
      props: ['value'],
      methods: {
        emitInput(event) {
          this.$emit('input', event.value)
        }
      }
    }
  }

  const entry = {
    resolver: resolver,
    meta: meta,
    component: component,
    componentName: elementName
  }
  elementMap.set(normalizeElementName(nsElementName), entry)
}

export function getElements() {
  return elementMap
}

export function getViewClass(elementName) {
  elementName = normalizeElementName(getNSElementName(elementName))
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
  nodeName = normalizeElementName(getNSElementName(nodeName))

  let meta = defaultViewMeta
  const entry = elementMap.get(nodeName)

  if (entry && entry.meta) {
    meta = entry.meta
  }

  return meta
}

export function isKnownView(elementName) {
  elementName = normalizeElementName(elementName)
  const nsElementName = normalizeElementName(getNSElementName(elementName))

  return elementMap.has(elementName) || elementMap.has(nsElementName)
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
    }
  },
  comps.ActionBar
)

registerElement(
  'ActionItem',
  () => require('tns-core-modules/ui/action-bar').ActionItem,
  {},
  comps.ActionItem
)

registerElement('android', null, {}, comps.android)

registerElement('ios', null, {}, comps.ios)

registerElement(
  'ListView',
  () => require('tns-core-modules/ui/list-view').ListView,
  {},
  comps.ListView
)

registerElement(
  'NavigationButton',
  () => require('tns-core-modules/ui/action-bar').NavigationButton,
  {},
  comps.NavigationButton
)

registerElement(
  'TabView',
  () => require('tns-core-modules/ui/tab-view').TabView,
  {
    model: {
      prop: 'selectedIndex',
      event: 'selectedIndexChange'
    }
  },
  comps.TabView
)

registerElement(
  'TabViewItem',
  () => require('tns-core-modules/ui/tab-view').TabViewItem,
  {
    skipAddToDom: true
  },
  comps.TabViewItem
)

registerElement('transition', null, {}, comps.transition)

registerElement('VTemplate', null, {}, comps.VTemplate)

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
    if (childNode.tagName === 'page') {
      parentNode.nativeView.navigate({ create: () => childNode.nativeView })
    }
  }
})
