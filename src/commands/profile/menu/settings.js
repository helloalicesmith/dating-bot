const { Menu } = require('@grammyjs/menu')

const { getLocaleText } = require('../../../helpers')
const handlers = require('../handlers/index')

const {
    settingsNameHandler,
    settingsOldHandler,
    settingsGenderHandler,
    settingsCitiesHandler,
    settingsPhotoHandler,
    settingsDescriptionHandler,
} = handlers

const main = new Menu('root-profile-menu')
    .submenu(getLocaleText('profile.menu_settings'), 'settings-profile-submenu')
    .row()
    .text(getLocaleText('profile.menu_settings_photo'), settingsPhotoHandler)
    .row()

const settingsSubmenu = new Menu('settings-profile-submenu')
    .text(getLocaleText('profile.menu_settings_name'), settingsNameHandler)
    .row()
    .text(getLocaleText('profile.menu_settings_old'), settingsOldHandler)
    .row()
    .text(getLocaleText('profile.menu_settings_gender'), settingsGenderHandler)
    .row()
    .text(getLocaleText('profile.menu_settings_city'), settingsCitiesHandler)
    .row()
    .text(
        getLocaleText('profile.menu_settings_description'),
        settingsDescriptionHandler
    )
    .row()
    .back('<< Назад')

main.register([settingsSubmenu])

module.exports = {
    profileMenu: main,
}
