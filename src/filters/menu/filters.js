const { Menu } = require('@grammyjs/menu')

const handlers = require('../handlers/index')

const { filtersOldHandler, filtersGenderHandler } = handlers

const getLocaleText = (value) => (ctx) => ctx.t(value)

const main = new Menu('root-filters-menu')
    .text(getLocaleText('menu.filters_old'), filtersOldHandler)
    .row()
    .text(getLocaleText('menu.filters_gender'), filtersGenderHandler)
    .row()
    .text(getLocaleText('menu.filters_city'))
    .row()

module.exports = {
    filtersMenu: main,
}
