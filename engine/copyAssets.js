var fio = require('./fileIO')
var cnf = require('./config')

const config = cnf.config()

const main = (config) => {

  looksForAssets(config, (assets) => {
    if (assets.paths == undefined || assets.paths.length < 1) {
      console.info(`There are no assets at ${config.assetsPath}`)
      return
    }
    console.log(assets)
    makesAssetsFolders(config, assets, () => {
      copysAssets(config, assets, () => {
        console.info('Assets copied')
      })
    })
  })

}

const assetsFoldersReady = (config) => {
  copysAssets(config, () => {
    console.info('Assets copied')
  })
}

const looksForAssets = (config, callback) => {
  fio.walksDirectorys(config.assetsPath, (msg, paths, dirs) => {
    callback({ paths:paths, dirs: dirs })
  })
}

const makesAssetsFolders = (config, assets, callback) => {
  const paths = assets.dirs.map(p => {
    const pathTail = p.substring(p.indexOf(config.assetsPath) + config.assetsPath.length, p.length)
    return `${config.portalPath}${pathTail}`
  })
  fio.createsFolders(paths, callback)
}

const copysAssets = (config, assets, callback) => {
  const copyPaths = assets.paths.map(p => {
    const pathTail = p.substring(p.indexOf(config.assetsPath) + config.assetsPath.length, p.length)
    const portalPath = `${config.portalPath}${pathTail}`
    return { src: p, dst: portalPath }
  })
  fio.copysFiles(copyPaths, callback)
}

main(config)

//exports.main = main
exports.makesAssetsFolders = makesAssetsFolders
exports.copysAssets = copysAssets
exports.looksForAssets = looksForAssets
