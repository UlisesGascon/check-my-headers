let messages = null
let status = null
let headers = null

const addMessage = (msg, type) => {
  if (!Array.isArray(messages)) {
    messages = []
  }
  messages.push({ msg, type })
}
const filterMessages = (type) => {
  const data = Array.isArray(messages) ? messages : []
  return data.filter(item => item.type === type)
}

const getAll = () => ({ messages, headers, status })

const addError = (msg) => addMessage(msg, 'error')
const addWarning = (msg) => addMessage(msg, 'warn')
const addInfo = (msg) => addMessage(msg, 'info')

const getWarnings = () => filterMessages('warn')
const getErrors = () => filterMessages('error')
const getInfo = () => filterMessages('info')

const setStatus = (currentStatus) => { status = currentStatus }
const getStatus = () => status

const setHeaders = (currentHeaders) => { headers = currentHeaders }
const getHeaders = () => headers

const resetReport = () => {
  messages = null
  status = null
  headers = null
}

module.exports = { addError, addWarning, addInfo, getAll, getWarnings, getErrors, getInfo, resetReport, setStatus, getStatus, setHeaders, getHeaders }
