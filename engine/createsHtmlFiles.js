// node file

var fs = require('fs')
var vars = {}

const main = (data) => {
  vars = data
  vars.pages = []
  vars.containers = []
  codesElements()
  preProcessesPages()
  createsPages()
}

const codesElements = () => {
  vars.filesData.map(fd => {
    let a = fd.name.split('.')
    let b = a[0].split('_')
    fd.code = b[0]
  })
}

const preProcessesPages = () => {
  vars.filesData.map(fd => {
    preProcessFileData(fd)
  })
}

const preProcessFileData = (fileData) => {
  extractsConfig(fileData)
  identifys(fileData)
}

const createsPages = () => {
  vars.filesData.map(fd => {
    if (fd.isPage) {
      const html = createsPage(fd)
      writesFile(html, fd.isPage)
    }
  })
}

const createsPage = (fd) => {
  let html = fd.data
  if (fd.isContained) {
    let container = vars.filesData.find(vfd => vfd.code == fd.isContained)
    fd.snips = fd.snips.concat(container.snips)
    html = container.data.replace('{{ contains }}', html)
  }
  html = html.replace('{{ title }}', fd.hasTitle)
  html = html.replace('{{ menu }}', vars.filesData.find( fd => fd.code == 'menu' ).data)

  if (fd.snips) {
    fd.snips.map(snip => {
      html = html.replace(`{{ ${snip.code} }}`, snip.html)
    })
  }
  return html
}

const identifys = (fd) => {
  if (fd.config) {
    identifysPages(fd)
    identifysContained(fd)
    identifysTitle(fd)
  }
  identifysSnipets(fd)
}

const identifysSnipets = (fd) => {
  let snips = []
  let codePaterns = fd.data.match(/{{ *.* }}/g)
  if (!codePaterns) return

  codePaterns.map(cp => {
    let code = cp.slice(3, -3)
    let sfd = vars.filesData.find(vfd => vfd.code == code)
    if (sfd) snips.push({ code: code, html: sfd.data })
  })
  fd.snips = snips
}

const identifysPages = (fd) => {
  const val = extractsConfigValue(fd.config, 'page')
  if (val) {
    fd.isPage = val
    vars.pages.push({ name: val, fileName: fd.name })
  }
}

const identifysContained = (fd) => {
  const val = extractsConfigValue(fd.config, 'contained')
  if (val) {
    fd.isContained = val
    vars.containers.push({ name: val, fileName: fd.name })
  }
}

const identifysTitle = (fd) => {
  const val = extractsConfigValue(fd.config, 'title')
  if (val) {
    fd.hasTitle = val
  }
}

const extractsConfigValue = (config, key) => {
  let val = null
  config.map(i => {
    if (i.length == 1 && key == null) val = i[0]
    if (i.length == 2 && i[0] == key) val = i[1]
  })
  return val
}

const extractsConfig = (fd) => {
  if (fd.data.search('---') == 0) {
    let ix = fd.data.indexOf('---', fd.data.indexOf('---') + 1)
    const confString = fd.data.slice(3, ix).trim()
    const confArray = confString.split('\r\n')
    fd.config = confArray.map(
      c => c.split('|').map(
        i => i.trim())
    )
    fd.data = fd.data.substring(ix + 3, fd.data.length)
  }
}

const writesFile = (pageString, pageName) => {
  fs.writeFile(`../public/${pageName}.html`, pageString, function (err) {
    if (err) throw Error
  })
}

exports.main = main
