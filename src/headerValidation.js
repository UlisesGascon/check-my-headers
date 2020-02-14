const { addError, addWarning, addInfo } = require('./report')
const { mandatory, optional, avoid, deprecated } = require('./rules.json')

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
