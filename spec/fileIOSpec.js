var fio = require('../engine/fileIO')
var cnf = require('../engine/config')

describe("File IO", function() {

  it('Gets a list of files in the engine folder', (done) => {
    let config = cnf.config()
    const rootDir = `${config.projectPath}\\engine`

    fio.walksDirectorys(
      rootDir,
      (msg, files, dirs) => {
        expect(files.length > 0 && dirs.length > 0).toBe(true)
        done()
      })
  })

  it('Loads files content as string into filesData array', (done) => {
    let config = cnf.config()
    const rootDir = `${config.projectPath}\\engine`
    const filePath = `${rootDir}\\engine.js`

    fio.loadsFilesContents([filePath], (filesData) => {
      expect(typeof(filesData[0].data)).toBe('string')
      done()
    })
  })

  xit('Makes test files', () => {
    const config = cnf.config()
    const testRoot = `${config.projectPath}${config.testRoot}`
    console.log(testRoot);

    expect('a').toBe('b')
  })
})
