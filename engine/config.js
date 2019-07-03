var ph = require('path')

const defaultValues = () => {
  return {
    siteRoot: 'simpstacgene',
    htmlRoot: 'portal',
    testRoot: 'tests',
    partsRoot: 'demo',
    imageFolders: ['details', 'small',  'medium'],
    assetFolderExcludes: ['less']
  }
}

function config () {
  let config = defaultValues()
  config.projectPath = findsRootDirectoryPath(config.siteRoot)
  config.enginePath =  `${config.projectPath}${config.siteRoot}\\engine\\${config.partsRoot}`
  config.portalPath = `${config.projectPath}${config.siteRoot}\\${config.htmlRoot}`
  config.assetsPath = `${config.projectPath}${config.siteRoot}\\engine\\${config.partsRoot}\\assets`
  return config
}

const findsRootDirectoryPath = (rootName) => {
  const pathOfThisFile = `${ph.dirname(require.main.filename)}`
  if (pathOfThisFile.includes(rootName)) {
    const path = pathOfThisFile.split(rootName)
    return path[0]
  }
  return false
}

exports.config = config
//exports.findsRoot = findsRootDirectoryPath
