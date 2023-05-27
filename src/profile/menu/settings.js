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
    getLocaleText('profile.menu_settings'),
    'settings-profile-submenu'
)

const settingsSubmenu = new Menu('settings-profile-submenu')
    .text(getLocaleText('profile.menu_settings_name'), settingsNameHandler)
    .row()
    .text(getLocaleText('profile.menu_settings_old'), settingsOldHandler)
    .row()
    .text(getLocaleText('profile.menu_settings_gender'), settingsGenderHandler)
    .row()
    .submenu('🏘️ город', 'settings-profile-cities-submenu')
    .row()
    .back('<< Назад')

const citiesSubmenu = new Menu('settings-profile-cities-submenu')
    .text(getLocaleText('profile.menu_settings_city'), settingsCitiesHandler)
    .row()
    .back('<< Назад', async (ctx) => ctx.menu.nav('settings-profile-submenu'))

main.register([settingsSubmenu, citiesSubmenu])

module.exports = {
    profileMenu: main,
}
