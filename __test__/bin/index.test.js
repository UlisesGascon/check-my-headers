const { exec } = require('child_process')
const path = require('path')

const CliFile = () => path.join(process.cwd(), 'bin/check-my-headers.js')

beforeEach(() => {
  jest.clearAllMocks()
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('CLI Behaviour', () => {
  test.skip('Success process: external url', (done) => {
    /*
    exec(`node ${CliFile()} https://github.com`, (err, stdout, stderr) => {
      expect(err).toBe(null)
      expect(stdout).toMatchSnapshot()
      expect(stderr).toMatchSnapshot()
      done()
    })
    */
  })

  test.skip('Success process: localhost url', (done) => {
    /*
    exec(`node ${CliFile()} http://localhost:3000`, (err, stdout, stderr) => {
      expect(err).toBe(null)
      expect(stdout).toMatchSnapshot()
      expect(stderr).toMatchSnapshot()
      done()
    })
    */
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
