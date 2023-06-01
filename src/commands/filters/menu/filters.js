const { Menu } = require('@grammyjs/menu')

const { getLocaleText } = require('../../../helpers')
const handlers = require('../handlers/index')

const { filtersOldHandler, filtersGenderHandler, filtersCityHandler } = handlers

const main = new Menu('root-filters-menu')
    .text(getLocaleText('filters.menu_gender'), filtersGenderHandler)
    .row()
    .text(getLocaleText('filters.menu_old'), filtersOldHandler)
    .row()
    .text(getLocaleText('filters.menu_city'), filtersCityHandler)
    .row()

module.exports = {
    filtersMenu: main,
}
