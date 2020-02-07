jest.mock('@nativescript/core/platform', () => {
  return {
    isAndroid: true,
    isIOS: false,
  }
}, {virtual: true}
)

jest.mock('@nativescript/core/utils/utils', () => {
  return {
    ios: {},
  }
}, {virtual: true}
)

jest.mock(
  '@nativescript/core/ui/core/view',
  () => require('ns-ui-mocks/view'),
  { virtual: true },
)

jest.mock(
  '@nativescript/core/ui/content-view',
  () => require('ns-ui-mocks/contentview'),
  { virtual: true }
)

jest.mock(
  '@nativescript/core/ui/layouts/layout-base',
  () => require('ns-ui-mocks/layoutbase'),
  { virtual: true }
)

jest.mock(
  '@nativescript/core/ui/button',
  () => require('ns-ui-mocks/button'),
  { virtual: true }
)

jest.mock(
  '@nativescript/core/ui/label',
  () => require('ns-ui-mocks/label'),
  { virtual: true }
)

jest.mock(
  '@nativescript/core/ui/frame',
  () => require('ns-ui-mocks/frame'),
  { virtual: true }
)

jest.mock(
  '@nativescript/core/ui/page',
  () => require('ns-ui-mocks/page'),
  { virtual: true }
)

jest.mock(
  '@nativescript/core/ui/proxyviewcontainer',
  () => require('ns-ui-mocks/proxyviewcontainer'),
  { virtual: true }
)

jest.mock(
  '@nativescript/core/ui/stacklayout',
  () => require('ns-ui-mocks/stacklayout'),
  { virtual: true }
)

jest.mock('@nativescript/core/application', () => {
  return {
    Application() {
    }
  }
}, {virtual: true}
)

jest.mock('@nativescript/core/ui/frame', () => {
  const getComponentByName = require('register').getComponentByName
  const Frame = getComponentByName('Frame')
  return {
    __esModule: true,
    default: Frame,
  }
}, {virtual: true})

import { registerElement } from 'register'
import Frame from 'runtime/components/frame'
import Vue from 'vue'

// To avoid `Unknown custom element` warning from Vue
Vue.config.ignoredElements = [
  'nativebutton',
  'nativeframe',
  'nativelabel',
  'nativepage',
  'nativestacklayout',
]

registerElement('Button', () => require('@nativescript/core/ui/button').Button)
registerElement('Label', () => require('@nativescript/core/ui/label').Label, {
  model: {
    prop: 'text',
    event: 'textChange'
  }
})
registerElement('Frame', () => require('@nativescript/core/ui/frame').Frame, {
  insertChild(parentNode, childNode, atIndex) {},
  component: Frame
})
registerElement('Page', () => require('@nativescript/core/ui/page').Page)
registerElement('StackLayout', () => require('@nativescript/core/ui/stacklayout').StackLayout)
registerElement('Document', () => require('@nativescript/core/ui/proxyviewcontainer').ProxyViewContainer)
