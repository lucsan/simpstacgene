var cnf = require('./config')
var fio = require('./fileIO')
var lfs = require('./loadFiles')
var ays = require('./analyse')
var crt = require('./create')

let config = cnf.config()
config.projectPath = fio.findsRoot(config.siteRoot)
config.enginePath =  `${config.projectPath}${config.siteRoot}\\engine`
config.portalPath = `${config.projectPath}${config.siteRoot}\\${config.htmlRoot}`

lfs.loadFiles(
  config,
  (filesData) => {
    ays.analyse(filesData)
    const pages = crt.creates(filesData)

    pages.map(p => {
      let path = `${config.portalPath}\\${p.name}.html`
      fio.writesFile(path, p.html)
    })
  })
