#!/usr/bin/env node

'use strict'

const checkMyHeaders = require('../src/index.js')
const { printError, printInfo } = require('./helpers')
const pkg = require('../package.json')

printInfo(`Welcome to ${pkg.name}@${pkg.version}`)

const url = process.argv[2]
if (!url) {
  printError('Missing argument URL!')
  printInfo('Example: check-my-headers https://github.com/ulisesgascon/check-my-headers')
  process.exit(1)
}

printInfo('The analysis has started...')

checkMyHeaders(url)
