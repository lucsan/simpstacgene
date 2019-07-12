var fio = require('./fileIO')
var callback

const main = (config, doneCallback) => {
  logIt(`Checking folder: pieces/${config.materialsRoot}/templates`)
  callback = doneCallback
  fio.walksDirectorys(config.materialsPath, filtersFiles)
}

const filtersFiles = (msg, filesPathsList) => {
  const data = removesEngineFiles(filesPathsList)
  fio.loadsFilesContents(data, (filesData) => callback(filesData))
}

// TODO: refactor to use filter()
const removesEngineFiles = (filesPathsList) => {
  let data = []
  filesPathsList.map(p => {
    if (p.includes('\\data\\')
      || p.includes('\\templates\\')
      && !p.includes('readme')
      && !p.includes('README.md')
    ) {
      data.push(p)
    }
  })
  return data
}

exports.loadFiles = main
