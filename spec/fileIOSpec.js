var fio = require('../engine/fileIO')
var cnf = require('../engine/config')

describe("File IO", function() {

  it('Gets a list of files in the engine folder', (done) => {
    let config = cnf.config()
    const rootDir = `${config.projectPath}${config.siteRoot}\\engine`

    fio.walksDirectorys(
      rootDir,
      (msg, data) => {
        expect(data.length > 0).toBe(true)
        done()
      })
  })

  it('Loads files content as string into filesData array', (done) => {
    let config = cnf.config()
    const rootDir = `${config.projectPath}${config.siteRoot}\\engine`
    const filePath = `${rootDir}\\engine.js`

    fio.loadsFilesContents([filePath], (filesData) => {
      expect(typeof(filesData[0].data)).toBe('string')
      done()
    })
  })

  xit('Makes test files', () => {
    const config = cnf.config()
    const testRoot = `${config.projectPath}${config.siteRoot}\${config.testRoot}`
    console.log(testRoot);

    expect('a').toBe('b')
  })
})
