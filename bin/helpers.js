const chalk = require('chalk')

const printError = (msg) => console.error(chalk.red.bold(msg))
const printInfo = (msg) => console.log(msg)
const printSuccess = (msg) => console.log(chalk.green.bold(msg))

module.exports = {
  printError, printInfo, printSuccess
}
