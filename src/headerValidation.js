const { addError, addWarning, addInfo } = require('./report')

const mandatory = ['content-security-policy', 'referrer-policy', 'strict-transport-security', 'x-xss-protection', 'x-content-type-options', 'date']
const optional = ['access-control-allow-origin', 'access-control-allow-methods', 'access-control-allow-headers', 'link', 'age', 'cache-control', 'content-length', 'content-type']
const avoid = ['x-powered-by', 'x-aspnet-version', 'via', 'server', 'x-Cache', 'x-request-id', 'x-aspnet-version', 'x-amzd-requestid']
const deprecated = ['p3p', 'expires', 'x-frame-options', 'x-ua-compatible', 'pragma']

// Check for mandatory, avoid and deprecated ones.
const errorFields = (headers) => {
  const currentHeaders = Object.keys(headers)
  avoid.filter(field => currentHeaders.includes(field)).forEach(field => addError(`Remove field: ${field}`))
  mandatory.filter(field => !currentHeaders.includes(field)).forEach(field => addError(`Missing field: ${field}`))
}

// Check for optional
const warningFields = (headers) => {
  const currentHeaders = Object.keys(headers)
  optional.filter(field => !currentHeaders.includes(field)).forEach(field => addWarning(`Missing field: ${field}`))
  deprecated.filter(field => currentHeaders.includes(field)).forEach(field => addWarning(`Deprecated field: ${field}`))
}

// Check for extra headers
const infoFields = (headers) => {
  const allHeaders = [].concat(optional, mandatory, avoid, deprecated)
  const currentHeaders = Object.keys(headers)
  currentHeaders.filter(field => !allHeaders.includes(field)).forEach(field => addInfo(`Extra field: ${field}`))
}

const headerValidation = (headers = {}) => [errorFields, warningFields, infoFields].forEach(item => item(headers))

module.exports = { headerValidation, errorFields, warningFields, infoFields }
