#!/usr/bin/env node
(async () => {
  const checkMyHeaders = require('../src/index')
  const {getErrors} = require('../src/report')
  const { printError, printInfo, printSuccess, generateReport } = require('./helpers')
  const pkg = require('../package.json')

  printInfo(`👋  Welcome to ${pkg.name}@${pkg.version}`)

  const url = process.argv[2]
  if (!url) {
    printError('😬  Missing argument URL!')
    printInfo('👉  Example: check-my-headers https://github.com/ulisesgascon/check-my-headers')
    process.exit(1)
  }

  printInfo(`🚀  The analysis has started for ${url}...`)

  try {
    await checkMyHeaders(url)
    const report = generateReport(url)
    printInfo(report)
    printSuccess('😄  Thanks for use check-my-headers!')
    process.exit(getErrors().length ? 0 : 1)
  } catch (err) {
    printError('😱  CRITICAL ERROR:')
    printError(err)
    process.exit(1)
  }
})()
