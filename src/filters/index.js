const Composer = require('../composer.js')
const { composer: menu } = require('./menu/index.js')
const conversation = require('./conversation/index.js')

const composer = new Composer()

composer.use(conversation)
composer.use(menu)

module.exports = composer
