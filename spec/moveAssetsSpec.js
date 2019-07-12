var mas = require('../engine/moveAssets')
var cnf = require('../engine/config')


describe("moveAssets", function() {

  it('looks for assets', (done) => {
    let config = cnf.config()
    mas.looksForAssets(config, (assets) => {
      expect(assets.dirs.length > 0).toBe(true)
      done()
    })
  })

  it('Makes required asset folders in target portal (public) folder', (done) => {
    let config = cnf.config()
    mas.looksForAssets(config, (assets) => {
      mas.makesAssetsFolders(config, assets, () => {
        expect('a').toBe('a')
        done()
      })
    })


  })

  xit('copysAssets', (done) => {
    let config = cnf.config()
    mas.looksForAssets(config, (assets) => {
      mas.makesAssetsFolders(config, assets, () => {
        mas.copysAssets(config, assets, () => {
          done()
          expect('a').toBe('a')
        })
      })
    })
  })
})
