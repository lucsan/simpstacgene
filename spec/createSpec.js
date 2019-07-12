var crt = require('../engine/create')

describe("Create", function() {

  it('finds the page container html, or return the page html', () => {
    let data = filesDataStub()
    let fd = data[4]
    crt.findsContainer(fd, data)
    expect(fd.html).toBe(data[1].data)
  })

  it('strips instructions from the html', () => {
    let data = filesDataStub()
    let fd = data[4]
    crt.stripsInstructionsFromHtml(fd)
    expect(fd.data.includes('---')).toBe(false)
  })

  it('fills the container html', () => {
    let data = filesDataStub()
    let fd = data[4]
    crt.findsContainer(fd, data)
    crt.fillsContainer(fd)
    expect(fd.data.includes('<div class="home">')).toBe(true)
  })

  it('fills list containers with html from list item', () => {
    let data = filesDataStub()
    let fd = data[5]
    crt.findsContainer(fd, data)
    crt.fillsContainer(fd)
    crt.fillsContents(fd, data)
    expect(fd.html.includes('<div class="item">')).toBe(true)
  })

  it('applies a title', () => {
    let data = filesDataStub()
    let fd = data[4]
    crt.findsContainer(fd, data)
    crt.fillsContainer(fd)
    crt.appliesTitle(fd)
    expect(fd.html.includes('<title>Home Page</title>')).toBe(true)
  })

  it('Fills snippet markup with snippets', () => {
    let data = filesDataStub()
    let fd = data[4]
    crt.findsContainer(fd, data)
    crt.fillsContainer(fd)
    crt.fillsSnippets(data)
    expect(fd.html.includes('<div class="snip">')).toBe(true)
  })

})

const filesDataStub = () => {
  return [
    { path: 'C:\\_builds\\projects\\edifices\\staticSite\\engine\\data\\home\\itema.html',
      data: '<div class="itema">\r\n  itema\r\n</div>\r\n',
      list: 'home',
      code: 'itema' },
    { path: 'C:\\_builds\\projects\\edifices\\staticSite\\engine\\templates\\default_tpl.html',
      data: '<!DOCTYPE html>\r\n<html lang="en" dir="ltr">\r\n  <head>\r\n    <meta charset="utf-8">\r\n    <title>{{ title }}</title>\r\n  </head>\r\n  <body>\r\n    <div id="menu">\r\n      {{ menu }}\r\n    </div>\r\n\r\n    {{ snip2_snp }}\r\n\r\n    {{ contains }}\r\n\r\n  </body>\r\n</html>\r\n',
      code: 'default' },
    { path: 'C:\\_builds\\projects\\edifices\\staticSite\\engine\\data\\listings1\\itemb.html',
      data: '<div class="item">\r\n  itemb\r\n</div>\r\n',
      list: 'listings1',
      code: 'itemb' },
    { path: 'C:\\_builds\\projects\\edifices\\staticSite\\engine\\data\\home\\itemc.html',
      data: '<div class="item">\r\n  itemc\r\n</div>\r\n',
      list: 'listings1',
      code: 'itemc' },
    { path: 'C:\\_builds\\projects\\edifices\\staticSite\\engine\\templates\\home_tpl.html',
      data: '---\r\n  contained | default\r\n  page | home\r\n  title | Home Page\r\n---\r\n<div class="home">\r\n  Home\r\n\r\n  <div class="">\r\n    {{ itema }}\r\n  </div>\r\n\r\n  <div class="">\r\n    {{ snip1_snp }}\r\n {{ snip1_snp }}\r\n {{ snip1_snp }}\r\n  </div>\r\n\r\n\r\n</div>\r\n',
      cmds: [ [Array], [Array], [Array] ],
      page: 'home',
      code: 'home',
      title: 'Home Page',
      contained: 'default' },
    { path: 'C:\\_builds\\projects\\edifices\\staticSite\\engine\\templates\\listings1_tpl.html',
      data: '---\r\ncontained | default\r\npage | listings\r\ntitle | The Gallery\r\n---\r\n<div class="listings">\r\n  {{ contains }}\r\n</div>\r\n',
      cmds: [
        [ 'contained', 'default' ],
        [ 'contains', 'data.listings1' ],
        [ 'page', 'listings' ],
        [ 'title', 'The Gallery' ] ],
      page: 'listings',
      code: 'listings1',
      title: 'The Gallery',
      contains: 'data.listings1',
      contained: 'default' },
    { path: 'C:\\_builds\\projects\\edifices\\staticSite\\engine\\templates\\type1_tpl.html',
      data: '---\r\n  contained | default\r\n  contains | data.listings1\r\n  page | demo\r\n  title | Demo Page\r\n---\r\n<div class="type1">\r\n  {{ menu }}\r\n\r\n  {{ contains }}\r\n</div>\r\n',
      cmds: [ [Array], [Array], [Array] ],
      page: 'demo',
      code: 'type1',
      title: 'Demo Page',
      contained: 'default' },
    { path: 'C:\\_builds\\projects\\edifices\\staticSite\\engine\\templates\\menu_tpl.html',
      data: '<div class="menu">\r\n  <ul>\r\n    <li><a href="home.html" >home</a></li>\r\n    <li><a href="listings.html" >gallery1</a></li>\r\n    <li><a href="demo.html" >demo</a></li>\r\n    <li><a href="other.html">about</a></li>\r\n  </ul>\r\n</div>\r\n',
      code: 'menu' },
    { path: 'C:\\_builds\\projects\\edifices\\staticSite\\engine\\templates\\snips\\snip1_snp_tpl.html',
      data: '<div class="snip">\r\n  Snippet 1\r\n</div>\r\n',
      code: 'snip1_snp' },
    { path: 'C:\\_builds\\projects\\edifices\\staticSite\\engine\\templates\\snips\\snip2_snp_tpl.html',
      data: '<div class="snip">\r\n  Snippet 2\r\n</div>\r\n',
      code: 'snip2_snp' }
  ]
}
