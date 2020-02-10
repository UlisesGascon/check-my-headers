const { isUrlValid } = require('../../src/helpers')

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
