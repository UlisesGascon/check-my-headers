const { exec } = require('child_process')
const path = require('path')

const CliFile = () => path.join(process.cwd(), 'bin/check-my-headers.js')
describe('CLI Behaviour', () => {
  test('Success process: external url', (done) => {
    exec(`node ${CliFile()} http://github.com/ulsiesgascon/check-my-headers`, (err, stdout, stderr) => {
      expect(err).toBe(null)
      expect(stdout).toMatchSnapshot()
      expect(stderr).toMatchSnapshot()
      done()
    })
  })

  test('Success process: localhost url', (done) => {
    exec(`node ${CliFile()} localhost:3000`, (err, stdout, stderr) => {
      expect(err).toBe(null)
      expect(stdout).toMatchSnapshot()
      expect(stderr).toMatchSnapshot()
      done()
    })
  })

  test('Error process: Missing URL', (done) => {
    exec(`node ${CliFile()}`, (err, stdout, stderr) => {
      expect(err.message).toMatch('Missing argument URL!')
      expect(stdout).toMatchSnapshot()
      expect(stderr).toMatchSnapshot()
      done()
    })
  })
})
