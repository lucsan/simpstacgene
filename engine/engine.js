global.logIt = msg => console.info(msg)

var cnf = require('./config')
var fio = require('./fileIO')
var lfs = require('./loadFiles')
var ays = require('./analyse')
var crt = require('./create')

let config = cnf.config()

lfs.loadFiles(
  config,
  (filesData) => {
    ays.analyse(filesData)
    const pages = crt.creates(filesData)
    if (pages === undefined) return console.error('no pages created.')
    fio.createsFolder(config.portalPath)
    pages.map(p => {
      let path = `${config.portalPath}${p.name}.html`
      fio.writesFile(path, p.html)
    })
  })
