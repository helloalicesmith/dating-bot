const { Menu } = require("@grammyjs/menu")

const { locationKeyboard, genderKeyboard } = require('../keyboards/user-keyboard')
const profileQuestion = require('../questions/profile-question')

const { cityQuestion } = profileQuestion

const main = new Menu("root-profile-menu").submenu('Изменить профиль ⚙️', 'settings-profile-submenu')

const settingsSubmenu = new Menu("settings-profile-submenu")
    .text("😌 Имя", async (ctx) => {
        await ctx.reply('Пожалуйста введите своё имя')

        return await ctx.conversation.enter("nameConversation");
    }).row()
    .text("👵 Возраст️", async (ctx) => {
        await ctx.reply('Пожалуйста введите ваш возраст')

        return await ctx.conversation.enter("oldConversation");
    }).row()
    .text('Пол', async (ctx) => {
        const keyboard = genderKeyboard(ctx)

        await ctx.reply('Пожалуйста введите ваш пол', { reply_markup: keyboard })

        return await ctx.conversation.enter("genderConversation");
    }).row()
    .submenu('🏘️ город', 'settings-profile-cities-submenu').row()
    .back('<< Назад')

const citiesSubmenu = new Menu('settings-profile-cities-submenu')
    .text('Добавить город по геолокации', async (ctx) => {
        return await ctx.reply('Пожалуйста добавте геолокацию', { reply_markup: locationKeyboard })
    }).row()
    .text('Добавить город по поиску', async (ctx) => {
        return await cityQuestion.replyWithMarkdown(ctx, 'Пожалуйста введите название города')
    }).row()
    .back('<< Назад', async (ctx) => {
        return ctx.menu.nav('settings-profile-submenu')
    })

main.register([settingsSubmenu, citiesSubmenu])

module.exports = {
    profileMenu: main,
}