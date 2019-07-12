const creates = (data) => {
  logIt(`Creating ${data.length} Assets`)

  data.map(fd => stripsInstructionsFromHtml(fd))

  data.map(fd => {
    findsContainer(fd, data)
    fillsContainer(fd)
    fillsContents(fd, data)
  })

  let pages = []
  data.map(fd => {
    if (!fd.page) return
    appliesTitle(fd)
    fillsSnippets(fd, data)
    pages.push({ name: fd.page, html: fd.html})
  })

  logIt(`Created ${pages.length} pages.`)

  return pages
}

/*
  Create can be a tad more sophisticated, so templates/snippets can contain
  listings (atm. only pages can)
*/

const fillsContents = (fd, data) => {
  if (!fd.contains) return
  const containsDir = fd.contains.replace('data.', '')
  let fs = data.filter(d => d.list == containsDir)
  let insertHtml = ''
  fs.map(f => insertHtml += (!f.html)? f.data: f.html)
  if (!fd.html) fd.html = fd.data
  fd.html = fd.html.replace('{{ contains }}', insertHtml)
}

const fillsSnippets = (fd, data) => {
  if (!fd.html) return
  data.map(f => {
    while (fd.html.indexOf(`{{ ${f.code} }}`) > -1) {
      fd.html = fd.html.replace(`{{ ${f.code} }}`, (!f.html)? f.data: f.html)
    }
  })
}

const appliesTitle = (fd) => {
  if (fd.title) fd.html = fd.html.replace('{{ title }}', fd.title)
}

const findsContainer = (fd, data) => {
  if (!fd.contained) return
  const container = data.find(d => d.code == fd.contained)
  if (container) {
    fd.html = container.data
  } else {
    logIt(`Error:- ${fd.contained}_tpl.html asset not found: ref:- ${fd.code}_tpl.html`)
  }
}

const stripsInstructionsFromHtml = (fd) => {
  if (!fd.data.includes('---')) return
  let html = fd.data
  const ix = html.indexOf('---', html.indexOf('---') + 1)
  if (ix == -1) return
  const h1 = html.substring(0, html.indexOf('---'))
  const h2 = html.substring(ix + 3, html.length)
  fd.data = h1 + h2
}

const fillsContainer = (fd) => {
  if (!fd.contained) return
  fd.html = fd.html.replace('{{ contains }}', fd.data)
}

exports.creates = creates
exports.stripsInstructionsFromHtml = stripsInstructionsFromHtml
exports.findsContainer = findsContainer
exports.fillsContainer = fillsContainer
exports.fillsContents = fillsContents
exports.appliesTitle = appliesTitle
exports.fillsSnippets = fillsSnippets
