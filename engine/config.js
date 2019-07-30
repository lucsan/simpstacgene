var ph = require('path')

const defaultValues = () => {
  return {
    htmlRoot: 'portal',
    materialsRoot: 'demo',
    assetsRoot: 'assets',
    testRoot: 'tests',
    assetFolderExcludes: ['less'] // TODO: implement this.
  }
}

function config() {
  let config = defaultValues()

  const thisFileLoc = ph.dirname(require.main.filename).replace(/\\/g, '/')

  if (thisFileLoc.indexOf('node_modules') > -1) {
    config.projectPath = thisFileLoc.split('node_modules')[0]
    config.enginePath = `${config.projectPath}node_modules/simpstacgene/engine`
    config.materialsPath = `${config.projectPath}`
  } else {
    config.projectPath = thisFileLoc.replace('/engine', '') + '/'
    config.enginePath = thisFileLoc
    config.materialsPath = `${config.projectPath}${config.materialsRoot}`
  }

  config.assetsPath = `${config.materialsPath}/${config.assetsRoot}/`
  config.portalPath = `${config.projectPath}${config.htmlRoot}/`

  try {
    const rootConfig = require(`${config.projectPath}config.js`).values()
    if (rootConfig.materialsRoot) {
      config.materialsRoot = rootConfig.materialsRoot
      config.materialsPath = `${config.projectPath}${rootConfig.materialsRoot}`
    }

    if (rootConfig.htmlRoot) {
      config.htmlRoot = rootConfig.htmlRoot
      config.portalPath = `${config.projectPath}${rootConfig.htmlRoot}/`
    }
    if (rootConfig.assetsRoot) {
      config.assetsRoot = rootConfig.assetsRoot
      config.assetsPath = `${config.materialsPath}/${rootConfig.assetsRoot}/`
    }
    if (rootConfig.assetFolderExcludes) config.assetFolderExcludes = rootConfig.assetFolderExcludes
  } catch(err) { logIt('No root config found, using defaults.', err, config.projectPath) }

  return config
}

// const findsRootDirectoryPath = (rootName) => {
//   console.log('rn', rootName)
//   const pathOfThisFile = `${ph.dirname(require.main.filename)}`
//   console.log('potf', pathOfThisFile)
//   if (pathOfThisFile.includes(rootName)) {
//     const path = pathOfThisFile.split(rootName)
//     console.log(path)
//     return path[0]
//   }
//   return false
// }

exports.config = config
//exports.findsRoot = findsRootDirectoryPath
