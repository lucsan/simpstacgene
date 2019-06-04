var cnf = require('./config')
var mas = require('./moveAssets')

const config = cnf.config()
mas.main(config)
