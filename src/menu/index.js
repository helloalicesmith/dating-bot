const Composer = require('../composer.js')
const { profileMenu } = require('./profile-menu.js')
const { citiesMenu } = require('./cities-menu.js')

const composer = new Composer()

composer.use(citiesMenu)
composer.use(profileMenu)

module.exports = composer