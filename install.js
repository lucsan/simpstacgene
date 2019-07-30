console.log('installing')

var cnf = require('./engine/config')
var fio = require('./engine/fileIO')

global.logIt = msg => console.info(msg)
const config = cnf.config()
fio.fileExists(`${config.projectPath}/config.js`, (err) => {
  if (!err) return writeDefaultConfig()
})

const writeDefaultConfig = () => {
  fio.writesFile(`${config.projectPath}/config.js`,
`exports.values = () => {
  return {
    materialsRoot: 'demo',
    htmlRoot: 'portal',
    assetsRoot: 'assets',
    assetFolderExcludes: ['less']
  }
}`)
}
