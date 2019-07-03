const creates = (data) => {
  let pages = []
  let d = data.filter(fd => {
    return createsHTML(fd, data)
  })

  console.log(d.map(i => console.log(i)))
console.log('unexpected end')
return

  data.map(fd => {
    if (fd.page) {
      pages.push({ name: fd.page, html: createsPage(fd, data) })
    }
  })
  return pages
}

// TODO - strip isntructions from all pages before building output.
/*
  Create can be a tad more sophisticated, so templates/snippets can contain
  listings (atm. only pages can)
*/

const createsHTML = (fd, data) => {
  console.log(fd)
  //fd.html = fd.data
  fd.html = findsContainer(fd, data)
  console.log(fd)
  fd.html = fillsContainer(fd, fd.html)
  fd.html = stripsInstructionsFromHtml(fd.html)
  return fd
}

const findsContainer = (fd, data) => {
  if (!fd.contained) return fd.data
  return data.find(d => d.code == fd.contained).data
}

const createsPage = (fd, data) => {
  let html = ''
  // html = findsContainer(fd, data)
  // html = fillsContainer(fd, html)
  // html = stripsInstructionsFromHtml(html)
  html = appliesTitle(fd, html)
  html = fillsContents(fd, data, html)
  html = fillsSnippets(data, html)
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

const fillsContainer = (fd, html) => {
  if (!fd.contained) return html
  return html.replace('{{ contains }}', fd.data)
}

const fillsContents = (fd, data, html) => {
  if (!fd.contains) return html
  let insertHtml = ''
  const containsDir = fd.contains.replace('data.', '')
  let fs = data.filter(d => d.list == containsDir)
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
    while (html.indexOf(`{{ ${fd.code} }}`) > -1) {
      html = html.replace(`{{ ${fd.code} }}`, fd.data)
    }
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
