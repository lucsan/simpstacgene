var fio = require('./fileIO')

const main = (config) => {
  makesAssetsFolders(config, () => assetsFoldersReady(config))
}

const assetsFoldersReady = (config) => {
  copysAssets(config, () => {
    console.log('Assets copied')
  })
}

const makesAssetsFolders = (config, callback) => {
  let paths = []
  paths.push(`${config.portalPath}\\css`)
  paths.push(`${config.portalPath}\\images`)
  if (config.imageFolders.length > 0) {
    config.imageFolders.map(name => {
      paths.push(`${config.portalPath}\\images\\${name}`)
    })
  }
  fio.createsFolders(paths, callback)
}

const copysAssets = (config, callback) => {
  let fils = []
  fio.walksDirectorys(config.assetsPath, (msg, paths) => {
    let fips = filtersAssetsPaths(paths)
    buildsCopyObjects(fips, config, callback)
  })

}

const buildsCopyObjects = (fips, config, callback) => {
  const fils = fips.map(f => {
    const pathTail = f.substring(f.indexOf(config.assetsPath) + config.assetsPath.length, f.length)
    const dest = `${config.portalPath}${pathTail}`
    return { src: f, dst: dest }
  })
  fio.copysFiles(fils, callback)
}

const filtersAssetsPaths = (paths) => {
  return paths.filter(f => {
    if (f.includes('\\images\\')) return f
    if (f.includes('\\css\\')) return f
  })
}

exports.main = main
exports.makesAssetsFolders = makesAssetsFolders
exports.copysAssets = copysAssets
