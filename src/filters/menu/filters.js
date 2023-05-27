const { Menu } = require('@grammyjs/menu')

const handlers = require('../handlers/index')

const { filtersOldHandler, filtersGenderHandler } = handlers

const getLocaleText = (value) => (ctx) => ctx.t(value)

const main = new Menu('root-filters-menu')
    .text(getLocaleText('filters.menu_old'), filtersOldHandler)
    .row()
    .text(getLocaleText('filters.menu_gender'), filtersGenderHandler)
    .row()
    .text(getLocaleText('filters.menu_city'))
    .row()

module.exports = {
    filtersMenu: main,
}
