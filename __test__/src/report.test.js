const { addError, addWarning, addInfo, getAll, getWarnings, getErrors, getInfo, resetReport, setStatus, getStatus, setHeaders, getHeaders } = require('../../src/report')

// Reset Mocks
beforeEach(resetReport)
afterEach(resetReport)

const addData = () => {
  addError('This is an error message 1')
  addError('This is an error message 2')

  addWarning('This is a warning message 1')
  addWarning('This is a warning message 2')

  addInfo('This is an info message 1')
  addInfo('This is an info message 2')

  setHeaders({
    item: 'content',
    'another-item': 'just another content'
  })

  setStatus(200)
}

describe('Reporting behaviour', () => {
  describe('Reset data', () => {
    test('Should clean data', () => {
      expect(getAll()).toStrictEqual({ messages: null, headers: null, status: null })
      addData()
      expect(getAll()).toMatchSnapshot()
      resetReport()
      expect(getAll()).toStrictEqual({ messages: null, headers: null, status: null })
    })
  })

  describe('Handle status', () => {
    test('Should manage the status data', () => {
      expect(getStatus()).toStrictEqual(null)
      addData()
      expect(getStatus()).toStrictEqual(200)
    })
  })

  describe('Handle headers', () => {
    test('Should manage the headers data', () => {
      expect(getHeaders()).toStrictEqual(null)
      addData()
      expect(getHeaders()).toMatchSnapshot()
    })
  })

  describe('Handle messages', () => {
    test('Should filter the messages at error level', () => {
      expect(getErrors()).toStrictEqual([])
      addData()
      expect(getErrors()).toMatchSnapshot()
    })

    test('Should add messages at error level', () => {
      expect(getErrors()).toStrictEqual([])
      addError('New Error 1')
      expect(getErrors()).toMatchSnapshot()
    })

    test('Should filter the messages at warning level', () => {
      expect(getWarnings()).toStrictEqual([])
      addData()
      expect(getWarnings()).toMatchSnapshot()
    })

    test('Should add messages at warning level', () => {
      expect(getWarnings()).toStrictEqual([])
      addWarning('New Warning 1')
      expect(getWarnings()).toMatchSnapshot()
    })

    test('Should filter the messages at info level', () => {
      expect(getInfo()).toStrictEqual([])
      addData()
      expect(getInfo()).toMatchSnapshot()
    })

    test('Should add messages at info level', () => {
      expect(getInfo()).toStrictEqual([])
      addInfo('New info 1')
      expect(getInfo()).toMatchSnapshot()
    })
  })
})
