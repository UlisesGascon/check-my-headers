const { isUrlValid, makeRequest } = require('./helpers')

const checkMyHeaders = async (url) => {
  if (!isUrlValid(url)) throw new Error('Invalid URL format!')
  const response = await makeRequest(url)

  console.log('Response:', response)
}

module.exports = checkMyHeaders
