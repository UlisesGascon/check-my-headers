const { getAll, resetReport } = require('../../src/report')
const { headerValidation } = require('../../src/headerValidation')
const { headers } = require('../__fixtures__/github_request.json')

beforeEach(resetReport)
afterEach(resetReport)

describe('headerValidation behaviour', () => {
  test('Should generate a valid report', () => {
    expect(getAll()).toStrictEqual({ messages: null, headers: null, status: null })
    headerValidation(headers)
    expect(getAll()).toMatchSnapshot()
  })
})
