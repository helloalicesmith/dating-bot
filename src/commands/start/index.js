const Composer = require('../../composer.js')
const { startHandler } = require('./handlers/index.js')

const composer = new Composer()

composer.command(['start'], startHandler)

module.exports = composer
