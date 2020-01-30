jest.mock('@nativescript/core/platform', () => {
  return {
    isAndroid: true,
    isIOS: false,
  }
}, {virtual: true})

jest.mock('@nativescript/core/utils/utils', () => {
  return {
    ios: {},
  }
}, {virtual: true})

jest.mock('@nativescript/core/ui/core/view', () => {
  return {
    View() {
    }
  }
}, {virtual: true})
jest.mock('@nativescript/core/ui/content-view', () => {
  return {
    ContentView() {
    }
  }
}, {virtual: true})
jest.mock('@nativescript/core/ui/layouts/layout-base', () => {
  return {
    LayoutBase() {
    }
  }
}, {virtual: true})

import { registerElement } from 'register'
import Vue from 'vue'

// To avoid `Unknown custom element` warning from Vue
Vue.config.ignoredElements = [
  'nativebutton',
  'nativeframe',
  'nativelabel',
  'nativepage',
  'nativestacklayout',
]

registerElement('Button', () => require('ns-ui-mocks/button').Button)
registerElement('Label', () => require('ns-ui-mocks/label').Label)
registerElement('Frame', () => require('ns-ui-mocks/frame').Frame)
registerElement('Page', () => require('ns-ui-mocks/page').Page)
registerElement('StackLayout', () => require('ns-ui-mocks/stacklayout').StackLayout)
