const Composer = require('../composer.js')
const userOptions = require('./commands.js')
const profile = require('./hears.js')

const composer = new Composer()

composer.on('message').use(userOptions).use(profile)

module.exports = composer
