var fs = require('fs')
var ph = require('path')

var vars = {}
vars.filesList = []
vars.filesData = []
vars.pagesList = {}

const main = (callback) => {
  vars.callback = callback
  engineFilePaths((msg, data) => {
    if (msg) return () => { console.log('done with errors', msg); }
    filesListLoaded(data)
  })
}

const filesListLoaded = (filesList) => {
  vars.filesList = filesList
  classifysFiles()
  loadsFilesContents()
}

const engineFilePaths = (done) => {
  const walks = (dir, done) => {
    let fils = []
    fs.readdir(dir, (err, files) => {
      if (err) return done(err)
      let pending = files.length
      if (!pending) return done(null, fils)
      files.map(f => {
        fs.stat(ph.resolve(dir, f), (err, stat) => {
          if (stat && stat.isDirectory()) {
            walks(ph.resolve(dir, f), (err, res) => {
              fils = fils.concat(res)
              if (!--pending) return done(null, fils)
            })
          } else {
            fils.push(ph.resolve(dir, f))
            if (!--pending) return done(null, fils)
          }
        })
      })
    })
  }
  walks('.', done)
}

const classifysFiles = () => {
  vars.filesData = []
  vars.filesList.map(fp => {
    let fd = {}
    fd.path = fp
    fd.name = '?'
    fd.cato = '?'
    fd.subo = '?'
    fd.cutPath = fp.slice(fp.indexOf('\\engine\\') + 8, fp.length)
    fd.pathArray = fd.cutPath.split('\\')
    fd = analysesPathArray(fd)
    if (fd.cato != '?') vars.filesData.push(fd)
  })
}

const analysesPathArray = (fileData) => {
  const pathArray = fileData.pathArray
  pathArray.map((item, idx) => {
    const isFile = item.indexOf('.') > -1
    if (isFile) {
      fileData.name = item
    } else {
      if (idx == 0) fileData.cato = item
      if (idx == 1) fileData.subo = item
    }
  })
  if (fileData.subo == '?') fileData.subo = 'none'
  return fileData
}

const loadsFilesContents = () => {
  let pending = vars.filesData.length
  vars.filesData.map(fd => {
    fs.readFile(fd.path, (err, data) => {
      fd.data = data.toString()
      if (!--pending) filesContentsLoaded()
    })
  })
}

const filesContentsLoaded = () => {
  vars.filesData.map(fd => {
    if (fd.name == 'pageList.dat') vars.pagesList = JSON.parse(fd.data)
  })
  vars.callback(vars)
}


exports.loadsFilesData = main
