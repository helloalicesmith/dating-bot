const { Menu } = require('@grammyjs/menu')

const { locationKeyboard, genderKeyboard } = require('../keyboards/index')

const main = new Menu('root-profile-menu').submenu(
    (ctx) => ctx.t('menu.main-profile-settings'),
    'settings-profile-submenu'
)

const settingsSubmenu = new Menu('settings-profile-submenu')
    .text(
        (ctx) => ctx.t('menu.submenu-profile-settings-name'),
        async (ctx) => {
            await ctx.reply('Пожалуйста введите своё имя')

            return await ctx.conversation.enter('nameConversation')
        }
    )
    .row()
    .text(
        (ctx) => ctx.t('menu.submenu-profile-settings-old'),
        async (ctx) => {
            await ctx.reply('Пожалуйста введите ваш возраст')

            return await ctx.conversation.enter('oldConversation')
        }
    )
    .row()
    .text(
        (ctx) => ctx.t('menu.submenu-profile-settings-gender'),
        async (ctx) => {
            const keyboard = genderKeyboard(ctx)

            await ctx.reply('Пожалуйста введите ваш пол', {
                reply_markup: keyboard,
            })

            return await ctx.conversation.enter('genderConversation')
        }
    )
    .row()
    .submenu('🏘️ город', 'settings-profile-cities-submenu')
    .row()
    .back('<< Назад')

const citiesSubmenu = new Menu('settings-profile-cities-submenu')
    .text(
        (ctx) => ctx.t('menu.submenu-profile-settings-cities-location'),
        async (ctx) => {
            return await ctx.reply(
                ctx.t('menu.submenu-profile-settings-cities-confirm'),
                {
                    reply_markup: locationKeyboard,
                }
            )
        }
    )
    .row()
    .back('<< Назад', async (ctx) => {
        return ctx.menu.nav('settings-profile-submenu')
    })

main.register([settingsSubmenu, citiesSubmenu])

module.exports = {
    profileMenu: main,
}
