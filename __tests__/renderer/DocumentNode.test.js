import DocumentNode from 'renderer/DocumentNode'

jest.mock('renderer/utils', () => ({
  insertChild: jest.fn(),
  removeChild: jest.fn()
}))

describe('DocumentNode', () => {
  test('works', () => {
  })
})