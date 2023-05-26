const Composer = require('../../composer.js')
const { profileMenu } = require('./settings.js')
const { citiesMenu } = require('./submenu/cities.js')

const composer = new Composer()

composer.use(profileMenu)
composer.use(citiesMenu)

module.exports = {
    composer,
    profileMenu,
    citiesMenu,
}
