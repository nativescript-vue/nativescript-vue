import { normalizeElementName, registerElement } from '../../element-registry'

import ActionBar from './action-bar'
import ActionItem from './action-item'
import android from './android'
import ios from './ios'
import ListView from './list-view'
import NavigationButton from './navigation-button'
import TabView from './tab-view'
import TabViewItem from './tab-view-item'
import transition from './transition'
import VTemplate from './v-template'

const componentMap = new Map()

export function registerComponent(componentName, resolver, meta, component) {
  if (resolver) {
    registerElement(`Native${componentName}`, resolver, meta)
  }
  if (!component) {
    // if no Vue component is passed, wrap the simpler vue component
    // which bind the events and attributes to the NS one
    const tagName = 'native-' + normalizeElementName(componentName)
    component = {
      template: `
        <${tagName} ref="${componentName}" v-bind="$attrs" v-on="$listeners">
          <slot></slot>
        </${tagName}>
      `
    }
  }
  componentMap.set(componentName, component)
}

export function getComponents() {
  return componentMap
}

registerComponent(
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
  ActionBar
)

registerComponent(
  'ActionItem',
  () => require('tns-core-modules/ui/action-bar').ActionItem,
  {},
  ActionItem
)

registerComponent('android', null, {}, android)

registerComponent('ios', null, {}, ios)

registerComponent('Label', () => require('tns-core-modules/ui/label').Label, {})

registerComponent(
  'ListView',
  () => require('tns-core-modules/ui/list-view').ListView,
  {},
  ListView
)

registerComponent(
  'NavigationButton',
  () => require('tns-core-modules/ui/action-bar').NavigationButton,
  {},
  NavigationButton
)

registerComponent(
  'TabView',
  () => require('tns-core-modules/ui/tab-view').TabView,
  {
    model: {
      prop: 'selectedIndex',
      event: 'selectedIndexChange'
    }
  },
  TabView
)

registerComponent(
  'TabViewItem',
  () => require('tns-core-modules/ui/tab-view').TabViewItem,
  {
    skipAddToDom: true
  },
  TabViewItem
)

registerComponent('transition', null, {}, transition)

registerComponent('VTemplate', null, {}, VTemplate)
