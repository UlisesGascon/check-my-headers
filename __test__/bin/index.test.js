const { execSync } = require('child_process')
const path = require('path')

const CliFile = () => path.join(process.cwd(), 'bin/check-my-headers.js')
describe('CLI Behaviour', () => {
  test('Success process: external url', () => {
    const exe = execSync(`node ${CliFile()} http://github.com/ulsiesgascon/check-my-headers`)
    expect(exe.toString()).toMatchSnapshot()
  })

  test('Success process: localhost url', () => {
    const exe = execSync(`node ${CliFile()} localhost:3000`)
    expect(exe.toString()).toMatchSnapshot()
  })

  test('Error process: Missing URL', () => {
    const exe = execSync(`echo ${CliFile()}`)
    expect(exe.toString()).toMatchSnapshot()
  })
})
