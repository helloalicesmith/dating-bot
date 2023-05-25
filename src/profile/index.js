const Composer = require('../composer.js')
const { composer: menu } = require('./menu/index.js')
const conversation = require('./conversation/index.js')

const composer = new Composer()

composer.use(menu)
composer.use(conversation)

module.exports = composer
