const githubRequest = require('../__test__/__fixtures__/github_request.json')

const rp = jest.fn(({ uri = 'https://github.com' }) => {
  if (uri !== 'https://github.com') {
    return Promise.reject(new Error(`Error: getaddrinfo ENOTFOUND ${uri}`))
  }
  return Promise.resolve(githubRequest)
})

module.exports = rp
