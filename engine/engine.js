var fileData = require('./loadsFilesData')
var pageProc = require('./createsHtmlFiles')

const filesDataLoaded = (vars) => {
  pageProc.main(vars)
}

fileData.loadsFilesData(filesDataLoaded)
