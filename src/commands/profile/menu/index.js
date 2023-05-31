const Composer = require('../../../composer.js')
const { profileMenu } = require('./settings.js')

const composer = new Composer()

composer.use(profileMenu)

module.exports = {
    composer,
    profileMenu,
}
