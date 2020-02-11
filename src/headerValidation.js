const { addError, addWarning, addInfo } = require('./report')

const mandatory = ['Content-Security-Policy', 'Referrer-Policy', 'Strict-Transport-Security', 'X-XSS-Protection', 'X-Content-Type-Options', 'date']
const optional = ['access-control-allow-origin', 'access-control-allow-methods', 'access-control-allow-headers', 'link', 'age', 'Cache-Control', 'content-length', 'content-type']
const avoid = ['x-powered-by', 'x-aspnet-version', 'Via', 'Server', 'X-Cache', 'X-Request-ID', 'X-ASPNet-Version', 'X-AMZN-RequestID']
const deprecated = ['P3P', 'Expires', 'X-Frame-Options', 'X-UA-Compatible', 'Pragma']

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
