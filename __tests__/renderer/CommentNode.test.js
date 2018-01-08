import CommentNode from 'renderer/CommentNode'

jest.mock('renderer/utils', () => ({
  insertChild: jest.fn(),
  removeChild: jest.fn()
}))

describe('CommentNode', () => {
  test('works', () => {
  })
})