const Composer = require('../composer.js')
const { profileMenu } = require('./profile-settings.js')
const { citiesMenu } = require('./cities.js')

const composer = new Composer()

composer.use(citiesMenu)
composer.use(profileMenu)

module.exports = composer