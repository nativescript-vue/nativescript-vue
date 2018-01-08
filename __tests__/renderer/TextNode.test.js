import TextNode from 'renderer/TextNode'

jest.mock('renderer/utils', () => ({
  insertChild: jest.fn(),
  removeChild: jest.fn()
}))

describe('TextNode', () => {
  test('works', () => {
  })
})