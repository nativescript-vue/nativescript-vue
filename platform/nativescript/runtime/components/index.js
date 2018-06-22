import ActionBar from './action-bar'
import ActionItem from './action-item'
import android from './android'
import ios from './ios'
import Label from './label'
import ListView from './list-view'
import NavigationButton from './navigation-button'
import TabView from './tab-view'
import TabViewItem from './tab-view-item'
import transition from './transition'
import VTemplate from './v-template'

const componentMap = new Map()

export function registerComponent(componentName, component) {
  componentMap.set(componentName, component)
}

export function getComponents() {
  return componentMap
}

registerComponent('ActionBar', ActionBar)
registerComponent('ActionItem', ActionItem)
registerComponent('android', android)
registerComponent('ios', ios)
registerComponent('Label', Label)
registerComponent('ListView', ListView)
registerComponent('NavigationButton', NavigationButton)
registerComponent('TabView', TabView)
registerComponent('TabViewItem', TabViewItem)
registerComponent('transition', transition)
registerComponent('VTemplate', VTemplate)
