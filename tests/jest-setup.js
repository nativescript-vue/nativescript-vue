jest.mock('tns-core-modules/platform', () => {
  return {
    isAndroid: true,
    isIOS: false,
  }
}, {virtual: true})

jest.mock('tns-core-modules/utils/utils', () => {
  return {
    ios: {},
  }
}, {virtual: true})

jest.mock('tns-core-modules/ui/core/view', () => {
  return {
    View() {
    }
  }
}, {virtual: true})
jest.mock('tns-core-modules/ui/content-view', () => {
  return {
    ContentView() {
    }
  }
}, {virtual: true})
jest.mock('tns-core-modules/ui/layouts/layout-base', () => {
  return {
    LayoutBase() {
    }
  }
}, {virtual: true})


import { registerElement } from 'register'

registerElement('Button', () => require('ns-ui-mocks/button').Button)
registerElement('Label', () => require('ns-ui-mocks/label').Label)
registerElement('StackLayout', () => require('ns-ui-mocks/stacklayout').StackLayout)

