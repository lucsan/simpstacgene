var cnf = require('../engine/config')

describe('Config', function() {

  it('Gets the project root folder from the config file', () => {
    let config = cnf.config()
    expect(typeof(config.projectPath)).toBe('string')
  })

  it('Creates relative project path, piecesPath and portalPath', () => {
    const config = cnf.config()
    expect(config.enginePath.includes('engine')).toBe(true)
  })


})
