
const analyse = (data) => {
  logIt(`Analysing ${data.length} tpl assets`)
  data.map(fd => {
    identifysPageCodeFromPageName(fd)
    extractsPageInstructions(fd)
    identifysPages(fd)
    indentifysContainedListing(fd)
  })

  return data
}

const extractsPageInstructions = (file) => {
  if (!file.data.includes('---')) return
  const ix = file.data.indexOf('---', file.data.indexOf('---') + 1)
  if (ix == -1) return
  const s = file.data.slice(3, ix).trim()
  const a = s.split('\r\n')
  file.cmds = a.map(c => c.split('|').map(i => i.trim()))
  //console.log(`instructions found ${file.cmds}`)
}

const identifysPages = (file) => {
  identifysInstructionValueFromName(file, 'page')
  identifysInstructionValueFromName(file, 'title')
  identifysInstructionValueFromName(file, 'contained')
  identifysInstructionValueFromName(file, 'contains')
}

const identifysInstructionValueFromName = (file, name) => {
  if (!file.cmds) return
  const a = file.cmds.find(c => c[0] == name)
  if (a && a.length == 2) file[name] = a[1]
  if (file[name]) console.info(`instructions found: ${name} | ${file[name]}`)
}

const identifysPageCodeFromPageName = (fd) => {
  const a = fd.path.split('\\')
  fd.code = a[a.length - 1].replace('.html', '').replace('_tpl', '')
  console.info(`Asset identified: ${fd.code}`)
}

const indentifysContainedListing = (fd) => {
  const pcs = fd.path.split('\\')
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
