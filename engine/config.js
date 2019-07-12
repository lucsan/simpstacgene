var ph = require('path')

const defaultValues = () => {
  return {
    siteRoot: 'simpstacgene',
    nodeRoot: '',  // 'node_modules\\simpstacgene\\'
    htmlRoot: 'portal',
    testRoot: 'tests',
    materialsRoot: 'demo',
    imageFolders: ['details', 'small',  'medium'],
    assetFolderExcludes: ['less']
  }
}

function config () {
  let config = defaultValues()
  config.projectPath = findsRootDirectoryPath(config.siteRoot)
  config.enginePath =  `${config.projectPath}${config.nodeRoot}${config.siteRoot}\\engine`
  config.materialsPath =  `${config.projectPath}${config.siteRoot}\\${config.materialsRoot}`
  config.portalPath = `${config.projectPath}${config.siteRoot}\\${config.htmlRoot}`
  config.assetsPath = `${config.projectPath}${config.siteRoot}\\${config.materialsRoot}\\assets`
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
