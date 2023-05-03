const got = require('got')

const isUrlValid = (url = '') => {
  if (typeof (url) !== 'string') return false
  const regex = /(?:^|[ \t])((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)/g
  return regex.test(url)
}

const makeRequest = async (url) => {
  const { headers, statusCode } = await got(url)
  return { headers, statusCode }
}

module.exports = {
  isUrlValid, makeRequest
}
