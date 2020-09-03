import * as utils from 'renderer/utils'

jest.mock('@nativescript/core', () => {
  return {
    View() {
    },
    ContentView() {
    },
    LayoutBase() {
    }
  }
}, {virtual: true})

const getParentAndChild = (parentType) => {
  return {
    parentNode: {
      nativeView: parentType ? new parentType : {},
      meta: {}
    },
    childNode: {
      nativeView: {},
      meta: {}
    }
  }
}

describe('utils', () => {
  test('isView', () => {
    const View = require('@nativescript/core').View;

    expect(utils.isView()).toEqual(false)
    expect(utils.isView('a')).toEqual(false)
    expect(utils.isView(1)).toEqual(false)
    expect(utils.isView(new View())).toEqual(true)
  })

  test('isLayout', () => {
    const LayoutBase = require('@nativescript/core').LayoutBase;

    expect(utils.isLayout()).toEqual(false)
    expect(utils.isLayout('a')).toEqual(false)
    expect(utils.isLayout(1)).toEqual(false)
    expect(utils.isLayout(new LayoutBase())).toEqual(true)
  })

  test('isContentView', () => {
    const ContentView = require('@nativescript/core').ContentView;

    expect(utils.isContentView()).toEqual(false)
    expect(utils.isContentView('a')).toEqual(false)
    expect(utils.isContentView(1)).toEqual(false)
    expect(utils.isContentView(new ContentView())).toEqual(true)
  })

  test('insertChild returns early if there is no parent or child should not be added to dom', () => {
    expect(utils.insertChild()).toBeFalsy();
    expect(utils.insertChild(true, {meta: {skipAddToDom: true}})).toBeFalsy();
  })

  test('insertChild skips adding childNode to unknown parent', () => {
    const {parentNode, childNode} = getParentAndChild();

    expect(utils.insertChild(parentNode, childNode)).toBeFalsy()
  })


  test('insertChild adds childNode to Layout parent', () => {
    const LayoutBase = require('@nativescript/core').LayoutBase;
    const {parentNode, childNode} = getParentAndChild(LayoutBase);
    parentNode.nativeView.addChild = jest.fn();
    childNode.nativeView.parent = null;

    utils.insertChild(parentNode, childNode);
    expect(parentNode.nativeView.addChild.mock.calls.length).toBe(1)
  })


  test('insertChild adds childNode at index to Layout parent', () => {
    const LayoutBase = require('@nativescript/core').LayoutBase;
    const {parentNode, childNode} = getParentAndChild(LayoutBase);
    parentNode.nativeView.insertChild = jest.fn();
    childNode.nativeView.parent = null;

    utils.insertChild(parentNode, childNode, 1);
    expect(parentNode.nativeView.insertChild.mock.calls.length).toBe(1)
  })

  test('insertChild removes childNode if the parent is the same Layout parent', () => {
    const LayoutBase = require('@nativescript/core').LayoutBase;
    const {parentNode, childNode} = getParentAndChild(LayoutBase);
    parentNode.nativeView.getChildIndex = jest.fn().mockReturnValueOnce(1).mockReturnValueOnce(-1);
    parentNode.nativeView.removeChild = jest.fn();
    parentNode.nativeView.insertChild = jest.fn();
    parentNode.nativeView.addChild = jest.fn();
    childNode.nativeView.parent = parentNode.nativeView;

    utils.insertChild(parentNode, childNode);
    expect(parentNode.nativeView.getChildIndex.mock.calls.length).toBe(1)
    expect(parentNode.nativeView.removeChild.mock.calls.length).toBe(1)

    //
    utils.insertChild(parentNode, childNode);
    expect(parentNode.nativeView.getChildIndex.mock.calls.length).toBe(2)
  })

  test('insertChild adds comment node to ContentView parent', () => {
    const ContentView = require('@nativescript/core').ContentView;
    const {parentNode, childNode} = getParentAndChild(ContentView);
    childNode.nodeType = 8;
    parentNode.nativeView._addView = jest.fn();

    utils.insertChild(parentNode, childNode);
    expect(parentNode.nativeView._addView.mock.calls.length).toBe(1);
  })

  test('insertChild sets content of ContentView parent', () => {
    const ContentView = require('@nativescript/core').ContentView;
    const {parentNode, childNode} = getParentAndChild(ContentView);

    utils.insertChild(parentNode, childNode);
    expect(parentNode.nativeView.content).toEqual(childNode.nativeView);
  })

  test('insertChild adds child from builder to unknown parent', () => {
    const {parentNode, childNode} = getParentAndChild();
    parentNode.nativeView._addChildFromBuilder = jest.fn();
    childNode._nativeView = {
      constructor: {name: 'test'}
    };

    utils.insertChild(parentNode, childNode);
    expect(parentNode.nativeView._addChildFromBuilder.mock.calls.length).toBe(1);
    expect(parentNode.nativeView._addChildFromBuilder.mock.calls[0][0]).toEqual('test')
  })
})
