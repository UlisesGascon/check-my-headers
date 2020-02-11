const { isUrlValid, makeRequest } = require('../../src/helpers')
const githubRequest = require('../__fixtures__/github_request.json')

const cleanUp = () => {
  jest.clearAllMocks()
}

// Mocking
jest.mock('request-promise')

// Reset Mocks
beforeEach(cleanUp)
afterEach(cleanUp)

describe('isUrlValid behaviour', () => {
  test('Should match following URLs', () => {
    expect(isUrlValid('http://localhost:300')).toBe(true)
    expect(isUrlValid('localhost:300')).toBe(true)
    expect(isUrlValid('example.com')).toBe(true)
    expect(isUrlValid('example.com:3000')).toBe(true)
    expect(isUrlValid('https://example.com:3000')).toBe(true)
    expect(isUrlValid('http://example.com:3000')).toBe(true)
    expect(isUrlValid('http://example.com:3000/?q=data')).toBe(true)
    expect(isUrlValid('http://example.com:3000/foo/bar')).toBe(true)
    expect(isUrlValid('http://example.com:3000/foo/bar?q=data')).toBe(true)
  })

  test('Should not match following URLs', () => {
    expect(isUrlValid('')).toBe(false)
    expect(isUrlValid({})).toBe(false)
    expect(isUrlValid([])).toBe(false)
    expect(isUrlValid(100)).toBe(false)
    expect(isUrlValid('http://domain')).toBe(false)
  })
})

describe('makeRequest behaviour', () => {
  test('Should match following URLs', () => {
    return makeRequest('https://github.com')
      .then(({ headers, statusCode }) => {
        expect(headers).toBe(githubRequest.headers)
        expect(statusCode).toBe(githubRequest.statusCode)
      })
      .catch(err => expect(err).toBe(null))
  })

  test('Should handle connection problems and not responding URLs', () => {
    return makeRequest('https://error.connection')
      .catch(err => expect(err.message).toMatch('Error: getaddrinfo ENOTFOUND'))
  })
})
