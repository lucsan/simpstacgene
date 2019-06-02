var fio = require('../engine/fileIO')
var cnf = require('../engine/config')

describe("File IO", function() {

  it('Gets the project root folder from the config file', () => {
    let config = cnf.config()
    const projectPath = fio.findsRoot(config.siteRoot)
    expect(typeof(projectPath)).toBe('string')
  })

  it('Gets a list of files in the engine folder', (done) => {
    let config = cnf.config()
    config.projectPath = fio.findsRoot(config.siteRoot)
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
    config.projectPath = fio.findsRoot(config.siteRoot)
    const rootDir = `${config.projectPath}${config.siteRoot}\\engine`
    const filePath = `${rootDir}\\engine.js`

    fio.loadsFilesContents([filePath], (filesData) => {
      expect(typeof(filesData[0].data)).toBe('string')
      done()
    })
  })

  // it('Saves files to the htmlRoot folder in config (public, portal)', () => {
  //   let config = cnf.config()
  //   config.projectPath = fio.findsRoot(config.siteRoot)
  //   let htmlDir = `${config.projectPath}${config.siteRoot}\\${config.htmlRoot}`
  //
  //   const html = '<html>test</html>'
  //
  //   expect('a').toBe('b')
  // })
})
