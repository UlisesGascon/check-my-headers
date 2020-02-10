const { printError, printInfo, printSuccess } = require('../../bin/helpers')

const consoleOrg = console.log
const consoleError = console.error
beforeEach(() => {
  console.log = () => {}
  console.error = () => {}
})

afterEach(() => {
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
