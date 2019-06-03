const creates = (data) => {
  let pages = []
  data.map(fd => {
    if (fd.page) {
      pages.push({ name: fd.code, html: createsPage(fd, data) })
    }
  })
  return pages
}

const createsPage = (fd, data) => {
  let html = ''
  html = findsContainer(fd, data)
  html = fillsContainer(fd, html)
  html = stripsInstructionsFromHtml(html)
  html = appliesTitle(fd, html)
  html = fillsSnippets(data, html)
  html = fillsContents(fd, data, html)
  return html
}

const stripsInstructionsFromHtml = (html) => {
  if (!html.includes('---')) return
  const ix = html.indexOf('---', html.indexOf('---') + 1)
  if (ix == -1) return
  const h1 = html.substring(0, html.indexOf('---'))
  const h2 = html.substring(ix + 3, html.length)
  return h1 + h2
}

const findsContainer = (fd, data) => {
  if (!fd.contained) return fd.data
  return data.find(d => d.code == fd.contained).data
}

const fillsContainer = (fd, html) => {
  if (!fd.contained) return html
  return html.replace('{{ contains }}', fd.data)
}

const fillsContents = (fd, data, html) => {
  let insertHtml = ''
  let fs = data.filter(d => d.list == fd.code)
  fs.map(f => {
    insertHtml += f.data
  })
  html = html.replace('{{ contains }}', insertHtml)
  return html
}

const appliesTitle = (fd, html) => {
  if (fd.title) html = html.replace('{{ title }}', fd.title)
  return html
}

const fillsSnippets = (data, html) => {
  data.map(fd => {
    html = html.replace(`{{ ${fd.code} }}`, fd.data)
  })
  return html
}

exports.creates = creates
exports.createsPage = createsPage
exports.stripsInstructionsFromHtml = stripsInstructionsFromHtml
exports.findsContainer = findsContainer
exports.fillsContainer = fillsContainer
exports.fillsContents = fillsContents
exports.appliesTitle = appliesTitle
exports.fillsSnippets = fillsSnippets
