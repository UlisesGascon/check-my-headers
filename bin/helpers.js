const chalk = require('chalk')
const { getStatus, getHeaders, getErrors, getInfo, getWarnings } = require('../src/report')

const printError = (msg) => console.error(chalk.red.bold(msg))
const printInfo = (msg) => console.log(msg)
const printSuccess = (msg) => console.log(chalk.green.bold(msg))

const generateReport = (uri) => {
  const headers = getHeaders()
  const printList = (list) => list.map(({ msg }) => `- ${msg}`).join('\n')
  return `
${chalk.inverse.bold(`Report for ${uri} (${getStatus()})`)}

${chalk.underline.bold('📜  Current Headers:')}
${Object.keys(headers).map(field => `- ${field}: ${headers[field]}`).join('\n')}

${chalk.red.underline.bold('🚨  Errors:')}
${printList(getErrors())}

${chalk.yellow.underline.bold('🚧  Warnings:')}
${printList(getWarnings())}

${chalk.blue.underline.bold('🔍  Info:')}
${printList(getInfo())}
${'='.repeat(20)}
  `
}

module.exports = {
  printError, printInfo, printSuccess, generateReport
}
