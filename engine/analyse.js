
const analyse = (data) => {
  logIt(`Analysing ${data.length} tpl assets`)
  data.map(fd => {
    identifysPageCodeFromPageName(fd)
    extractsPageInstructions(fd)
    identifysPages(fd)
    indentifysContainedListing(fd)
    identifysContainedTemplate(fd)
  })
  //data.map(d => {if(d.code == 'test') console.log(d)})
  return data
}

const identifysContainedTemplate = (fd) => {
  if (!fd.contained) return
  console.log('contained', fd.code)
}

const extractsPageInstructions = (fd) => {
  if (!fd.data.includes('---')) return
  const ix = fd.data.indexOf('---', fd.data.indexOf('---') + 1)
  if (ix == -1) return
  const s = fd.data.slice(3, ix).trim()
  const a = s.split('\n')
  fd.cmds = a.map(c => c.split('|').map(i => i.trim()))
}

const identifysPages = (fd) => {
  identifysInstructionValueFromName(fd, 'page')
  identifysInstructionValueFromName(fd, 'title')
  identifysInstructionValueFromName(fd, 'contained')
  identifysInstructionValueFromName(fd, 'contains')
}

const identifysInstructionValueFromName = (fd, name) => {
  if (!fd.cmds) return
  const a = fd.cmds.find(c => c[0] == name)
  if (a && a.length == 2) fd[name] = a[1]
  if (fd[name]) console.info(`instructions found: ${name} | ${fd[name]}`)
}

const identifysPageCodeFromPageName = (fd) => {
  const a = fd.path.split('/')
  fd.code = a[a.length - 1].replace('.html', '').replace('_tpl', '')
  console.info(`Asset identified: ${fd.code}`)
}

const indentifysContainedListing = (fd) => {
  const pcs = fd.path.split('/')
  for (let i = 0; i < pcs.length; i++) {
    if (pcs[i] == 'data') {
      fd.list = pcs[i + 1]
      return
    }
  }
}

exports.analyse = analyse
exports.identifysPages = identifysPages
exports.extractsPageInstructions = extractsPageInstructions
exports.identifysPageCode = identifysPageCodeFromPageName
exports.indentifysContainedListing = indentifysContainedListing
