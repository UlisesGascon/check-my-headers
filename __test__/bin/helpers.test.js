const { printError, printInfo, printSuccess, generateReport } = require('../../bin/helpers')
const serializer = require('jest-serializer-ansi')
const checkMyHeaders = require('../../src/index')

expect.addSnapshotSerializer(serializer)

// Mocking
jest.mock('request-promise')

const consoleOrg = console.log
const consoleError = console.error
beforeEach(() => {
  jest.clearAllMocks()
  console.log = () => {}
  console.error = () => {}
})

afterEach(() => {
  jest.clearAllMocks()
  console.log = consoleOrg
  console.error = consoleError
})

describe('General CLI helpers', () => {
  test('Terminal format helpers (colors)', () => {
    expect(printError('This is an error msg')).toMatchSnapshot()
    expect(printInfo('This is an information msg')).toMatchSnapshot()
    expect(printSuccess('This is a success msg')).toMatchSnapshot()
  })
})

describe('General CLI Reporting', () => {
  test('Should generate a valid report)', async () => {
    await checkMyHeaders('https://github.com')
    expect(generateReport('https://github.com')).toMatchSnapshot()
  })
})
