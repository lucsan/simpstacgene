var ph = require('path')

const defaultValues = () => {
  return {
    htmlRoot: 'portal',
    testRoot: 'tests',
    materialsRoot: 'demo',
    imageFolders: ['details', 'small',  'medium'],
    assetFolderExcludes: ['less']
  }
}

function config () {
  let config = defaultValues()
  const rootConfig = require(
    `${ph.dirname(require.main.filename)}`
      .replace('\\engine', '\\config.js')
  ).values()

  config.projectPath = findsRootDirectoryPath(rootConfig.siteRoot)
  config.enginePath =  `${config.projectPath}${config.nodeRoot}${rootConfig.siteRoot}\\engine`
  config.materialsPath =  `${config.projectPath}${rootConfig.siteRoot}\\${config.materialsRoot}`
  config.portalPath = `${config.projectPath}${rootConfig.siteRoot}\\${config.htmlRoot}`
  config.assetsPath = `${config.projectPath}${rootConfig.siteRoot}\\${config.materialsRoot}\\assets`
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
