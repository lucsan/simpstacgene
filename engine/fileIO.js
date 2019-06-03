var fs = require('fs')
var ph = require('path')

const findsRootDirectoryPath = (rootName) => {
  const pathOfThisFile = `${ph.dirname(require.main.filename)}`
  if (pathOfThisFile.includes(rootName)) {
    const path = pathOfThisFile.split(rootName)
    return path[0]
  }
  return false
}

const walksDirectorys = (rootDir, doneCallback) => {
  const walks = (dir, doneCallback) => {
    let fils = []
    fs.readdir(dir, (err, files) => {
      if (err) return doneCallback(err)
      let pending = files.length
      if (!pending) return doneCallback(null, fils)
      files.map(f => {
        fs.stat(ph.resolve(dir, f), (err, stat) => {
          if (stat && stat.isDirectory()) {
            walks(ph.resolve(dir, f), (err, res) => {
              fils = fils.concat(res)
              if (!--pending) return doneCallback(null, fils)
            })
          } else {
            fils.push(ph.resolve(dir, f))
            if (!--pending) return doneCallback(null, fils)
          }
        })
      })
    })
  }
  walks(rootDir, doneCallback)
}

const loadsFilesContents = (filesArray, doneCallback) => {
  let filesData = []
  let pending = filesArray.length
  filesArray.map(fa => {
    fs.readFile(fa, (err, data) => {
      filesData.push({ path: fa, data: data.toString()})
      if (!--pending) doneCallback(filesData)
    })
  })
}

const writesFile = (pagePath, pageHtml) => {
  fs.writeFile(pagePath, pageHtml, function (err) {
    if (err) console.log(err)
  })
}

const createsFolder = (path) => {
  fs.mkdir(path, err => {
    if (err) {
      if (err.code == 'EEXIST') return
      console.log(err)
    }
  })
}

const removesFolder = (path) => {
  fs.rmdir(path, err => console.log(err) )
}

exports.findsRoot = findsRootDirectoryPath
exports.walksDirectorys = walksDirectorys
exports.loadsFilesContents = loadsFilesContents
exports.writesFile = writesFile
exports.createsFolder = createsFolder
exports.removesFolder = removesFolder
