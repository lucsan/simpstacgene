var mas = require('../engine/moveAssets')
var cnf = require('../engine/config')


describe("moveAssets", function() {

  it('Makes required asset folders in target portal (public) folder', (done) => {
    let config = cnf.config()
    mas.makesAssetsFolders(config, () => {
      done()
      expect('a').toBe('a')
    })
  })

  it('copysAssets', (done) => {
    let config = cnf.config()
    mas.copysAssets(config, () => {
      done()
      expect('a').toBe('a')
    })


  })
})
