var ays = require('../engine/analyse')

describe("Analyse", function() {

  it('Extracts instructions from page files', () => {
    const fds = filesDataStub()
    let fd = fds[2]
    ays.extractsPageInstructions(fd)
    expect(fd.cmds.length == 4).toBe(true)
  })

  it('Identifies pages (marks fileData as page)', () => {
    const fds = filesDataStub()
    let fd = fds[2]
    ays.extractsPageInstructions(fd)
    ays.identifysPages(fd)
    expect(fd.page).toBe('listings')
  })

  it('Identifies (creates) the page code ( its {{ * }} markup corespondant)', () => {
    const fds = filesDataStub()
    let fd = fds[2]
    ays.extractsPageInstructions(fd)
    ays.identifysPages(fd)
    ays.identifysPageCode(fd)
    expect(fd.code).toBe('listings1')
  })

  it('identifies a contained files listing', () => {
    const fds = filesDataStub()
    let fd = fds[0]
    ays.indentifysContainedListing(fd)
    expect(fd.list).toBe('home')
  })


})


const filesDataStub = () => {
  return [
    { path: '\\staticSite\\engine\\data\\home\\itema.html',
      data: '<div class="itema">\r\n  itema\r\n</div>\r\n' },
    { path: 'C:\\_builds\\projects\\domes\\staticSite\\engine\\templates\\default_tpl.html',
      data: '<!DOCTYPE html>\r\n<html lang="en" dir="ltr">\r\n  <head>\r\n    <meta charset="utf-8">\r\n    <title>{{ title }}</title>\r\n  </head>\r\n  <body>\r\n    <div id="menu">\r\n      {{ menu }}\r\n    </div>\r\n\r\n    {{ snip2 }}\r\n\r\n    {{ contains }}\r\n\r\n  </body>\r\n</html>\r\n' },
    { path: 'staticSite\\engine\\templates\\listings1_tpl.html',
      data: '---\r\ncontained | default\r\ncontains | data.listings1\r\npage | listings\r\ntitle | The Gallery\r\n---\r\n<div class="listings">\r\n  {{ contains }}\r\n</div>\r\n' },
  ]
}
