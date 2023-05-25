const { Menu } = require('@grammyjs/menu')

const handlers = require('../handlers/index')

const {
    settingsNameHandler,
    settingsOldHandler,
    settingsGenderHandler,
    settingsCitiesHandler,
} = handlers

const getLocaleText = (value) => (ctx) => ctx.t(value)

const main = new Menu('root-profile-menu').submenu(
    getLocaleText('menu.main-profile-settings'),
    'settings-profile-submenu'
)

const settingsSubmenu = new Menu('settings-profile-submenu')
    .text(
        getLocaleText('menu.submenu-profile-settings-name'),
        settingsNameHandler
    )
    .row()
    .text(
        getLocaleText('menu.submenu-profile-settings-old'),
        settingsOldHandler
    )
    .row()
    .text(
        getLocaleText('menu.submenu-profile-settings-gender'),
        settingsGenderHandler
    )
    .row()
    .submenu('🏘️ город', 'settings-profile-cities-submenu')
    .row()
    .back('<< Назад')

const citiesSubmenu = new Menu('settings-profile-cities-submenu')
    .text(
        getLocaleText('menu.submenu-profile-settings-cities-location'),
        settingsCitiesHandler
    )
    .row()
    .back('<< Назад', async (ctx) => ctx.menu.nav('settings-profile-submenu'))

main.register([settingsSubmenu, citiesSubmenu])

module.exports = {
    profileMenu: main,
}
