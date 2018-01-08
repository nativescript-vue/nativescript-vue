import ElementNode from 'renderer/ElementNode'

jest.mock('renderer/utils', () => ({
  insertChild: jest.fn(),
  removeChild: jest.fn()
}))

describe('ElementNode', () => {
  test('works', () => {
  })
})