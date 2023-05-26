const Composer = require('../../composer.js')
const { filtersMenu } = require('./filters')

const composer = new Composer()

composer.use(filtersMenu)

module.exports = {
    composer,
    filtersMenu,
}
