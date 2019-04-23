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

jest.mock('tns-core-modules/ui/layouts/layout-base', () => {
  return {
    LayoutBase: {},
  }
}, {virtual: true})

jest.mock('tns-core-modules/ui/content-view', () => {
  return {
    ContentView: {},
  }
}, {virtual: true})

jest.mock('tns-core-modules/ui/core/view', () => {
  return {
    View: {},
  }
}, {virtual: true})

import Vue from 'runtime'
import { getElementMap, registerElement } from 'register'

registerElement('Button', () => require('ns-ui-mocks/button').Button)

Object.values(getElementMap()).forEach(entry => {
  Vue.component(entry.meta.component.name, entry.meta.component)
})
