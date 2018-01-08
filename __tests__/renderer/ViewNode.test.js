import ViewNode from 'renderer/ViewNode'
import * as elReg from 'element-registry'

jest.mock('renderer/utils', () => ({
  insertChild: jest.fn(),
  removeChild: jest.fn()
}))

describe('ViewNode', () => {
  test('firstChild returns null initially', () => {
    let node = new ViewNode()

    expect(node.firstChild).toBeNull()
  })

  test('firstChild returns the only child', () => {
    let node = new ViewNode()
    let childNode = new ViewNode()

    node.childNodes = [childNode]

    expect(node.firstChild).toEqual(childNode)
  })

  test('firstChild returns the correct child', () => {
    let node = new ViewNode()
    let childNode = new ViewNode()
    let otherChildNode = new ViewNode()

    node.childNodes = [childNode, otherChildNode]

    expect(node.firstChild).toEqual(childNode)
  })

  test('lastChild returns null initially', () => {
    let node = new ViewNode()

    expect(node.lastChild).toBeNull()
  })

  test('lastChild returns the only child', () => {
    let node = new ViewNode()
    let childNode = new ViewNode()

    node.childNodes = [childNode]

    expect(node.lastChild).toEqual(childNode)
  })

  test('lastChild returns the correct child', () => {
    let node = new ViewNode()
    let childNode = new ViewNode()
    let otherChildNode = new ViewNode()

    node.childNodes = [otherChildNode, childNode]

    expect(node.lastChild).toEqual(childNode)
  })

  test('insertBefore throws if no childNode is given', () => {
    let node = new ViewNode()

    expect(node.insertBefore).toThrow(`Can't insert child.`)
  })

  test('insertBefore throws if childNode has a different parent', () => {
    let node = new ViewNode()
    let childNode = new ViewNode()
    childNode.parentNode = new ViewNode()

    expect(() => node.insertBefore(childNode)).toThrow(
      `already has a different parent`
    )
  })

  test('insertBefore throws if childNode is already a child', () => {
    let node = new ViewNode()
    let childNode = new ViewNode()
    childNode.parentNode = node

    expect(() => node.insertBefore(childNode)).toThrow(`already a child`)
  })

  test('insertBefore throws if reference node has a different parent', () => {
    let node = new ViewNode()
    let childNode = new ViewNode()
    let refNode = new ViewNode()

    refNode.parentNode = new ViewNode()

    expect(() => node.insertBefore(childNode, refNode)).toThrow(
      `reference node has a different parent`
    )
  })

  test('insertBefore sets the correct node relations', () => {
    let node = new ViewNode()
    let childNode = new ViewNode()
    let refNode = new ViewNode()
    node.childNodes = [refNode]
    refNode.parentNode = node

    node.insertBefore(childNode, refNode)

    expect(node.childNodes.length).toBe(2)
    expect(childNode.parentNode).toEqual(node)
    expect(childNode.prevSibling).toBeFalsy()
    expect(childNode.nextSibling).toEqual(refNode)
    expect(refNode.prevSibling).toEqual(childNode)
    expect(refNode.nextSibling).toBeFalsy()
  })

  test('appendChild throws if no childNode is given', () => {
    let node = new ViewNode()

    expect(node.appendChild).toThrow(`Can't append child.`)
  })

  test('appendChild throws if childNode has a different parent', () => {
    let node = new ViewNode()
    let childNode = new ViewNode()
    childNode.parentNode = new ViewNode()

    expect(() => node.appendChild(childNode)).toThrow(
      `already has a different parent`
    )
  })

  test('appendChild throws if childNode is already a child', () => {
    let node = new ViewNode()
    let childNode = new ViewNode()
    childNode.parentNode = node

    expect(() => node.appendChild(childNode)).toThrow(`already a child`)
  })

  test('appendChild sets the correct node relations for only child', () => {
    let node = new ViewNode()
    let childNode = new ViewNode()

    node.appendChild(childNode)

    expect(node.childNodes.length).toBe(1)
    expect(childNode.parentNode).toEqual(node)
    expect(childNode.prevSibling).toBeFalsy()
  })

  test('appendChild sets the correct node relations for multiple children', () => {
    let node = new ViewNode()
    let childNode = new ViewNode()
    let prevChildNode = new ViewNode()

    node.appendChild(prevChildNode)
    node.appendChild(childNode)

    expect(node.childNodes.length).toBe(2)
    expect(childNode.prevSibling).toEqual(prevChildNode)
    expect(prevChildNode.nextSibling).toEqual(childNode)
  })

  test('removeChild throws if no childNode is given', () => {
    let node = new ViewNode()

    expect(node.removeChild).toThrow(`Can't remove child.`)
  })

  test('removeChild throws if childNode has a different parent', () => {
    let node = new ViewNode()
    let childNode = new ViewNode()
    childNode.parentNode = new ViewNode()

    expect(() => node.removeChild(childNode)).toThrow(`different parent.`)
  })

  test('removeChild throws if childNode has no parent', () => {
    let node = new ViewNode()
    let childNode = new ViewNode()

    expect(() => node.removeChild(childNode)).toThrow(`no parent.`)
  })

  test('removeChild sets the correct node relations for firstChild', () => {
    let node = new ViewNode()
    let childNode = new ViewNode()
    let nextChildNode = new ViewNode()

    node.appendChild(childNode)
    node.appendChild(nextChildNode)

    expect(nextChildNode.prevSibling).toEqual(childNode)

    node.removeChild(childNode)

    expect(nextChildNode.prevSibling).toBeNull()
  })

  test('removeChild sets the correct node relations for lastChild', () => {
    let node = new ViewNode()
    let prevChildNode = new ViewNode()
    let childNode = new ViewNode()

    node.appendChild(prevChildNode)
    node.appendChild(childNode)

    expect(prevChildNode.nextSibling).toEqual(childNode)

    node.removeChild(childNode)

    expect(prevChildNode.nextSibling).toBeNull()
  })

  test('removeChild sets the correct node relations for prevChildNode and nextChildNode', () => {
    let node = new ViewNode()
    let prevChildNode = new ViewNode()
    let childNode = new ViewNode()
    let nextChildNode = new ViewNode()

    node.appendChild(prevChildNode)
    node.appendChild(childNode)
    node.appendChild(nextChildNode)

    expect(prevChildNode.nextSibling).toEqual(childNode)
    expect(nextChildNode.prevSibling).toEqual(childNode)

    node.removeChild(childNode)

    expect(node.childNodes.length).toBe(2)
    expect(prevChildNode.nextSibling).toEqual(nextChildNode)
    expect(nextChildNode.prevSibling).toEqual(prevChildNode)
    expect(childNode.parentNode).toBeNull()
  })

  test('nativeView can be set once', () => {
    let node = new ViewNode()
    let dummyView = {name: 'dummy'}
    node.nativeView = dummyView

    expect(node.nativeView).toEqual(dummyView)
  })

  it("nativeView can't be set multiple times", () => {
    let node = new ViewNode()
    let dummyView = {name: 'dummy'}
    node.nativeView = dummyView

    expect(() => (node.nativeView = dummyView)).toThrow(`Can't override`)
    expect(node.nativeView).toEqual(dummyView)
  })

  test('meta should be fetched only once upon get', () => {
    elReg.getViewMeta = jest.fn()
    elReg.getViewMeta.mockReturnValue('meta')

    let node = new ViewNode()
    node.tagName = 'testing'

    let meta = node.meta
    let second_meta = node.meta

    expect(elReg.getViewMeta).toHaveBeenCalledWith('testing')
    expect(elReg.getViewMeta.mock.calls.length).toBe(1)
    expect(meta).toEqual('meta')
    expect(second_meta).toEqual('meta')
  })

  test('tagName should be normalized', () => {
    let node = new ViewNode()

    node.tagName = 'Testing'
    expect(node.tagName).toEqual('testing')

    node.tagName = 'TestingTesting'
    expect(node.tagName).toEqual('testingtesting')

    node.tagName = 'testing-testing'
    expect(node.tagName).toEqual('testingtesting')
  })
})
