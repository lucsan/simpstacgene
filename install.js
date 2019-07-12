console.log('installing')

var cnf = require('./engine/config')
var fio = require('./engine/fileIO')

global.logIt = msg => console.info(msg)
const config = cnf.config()

fio.writesFile(`${config.projectPath}config.js`,
`exports.values = () => {
  return {
    htmlRoot: 'portal',
    assetsRoot: 'assets',
    assetFolderExcludes: ['less']
  }
}`)
