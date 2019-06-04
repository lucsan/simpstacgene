var fio = require('./fileIO')
var callback

const main = (config, doneCallback) => {
  callback = doneCallback
  fio.walksDirectorys(config.enginePath, filtersFiles)
}

const filtersFiles = (msg, filesPathsList) => {
  const data = removesEngineFiles(filesPathsList)
  fio.loadsFilesContents(data, (filesData) => callback(filesData))
}

const removesEngineFiles = (filesPathsList) => {
  let data = []
  filesPathsList.map(p => {
    if (p.includes('\\data\\')
      || p.includes('\\templates\\')
      && !p.includes('readme')
    ) {
      data.push(p)
    }
  })
  return data
}

exports.loadFiles = main
