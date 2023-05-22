const { Menu } = require("@grammyjs/menu")

const { locationKeyboard } = require('../keyboards/user-keyboard')
const profileQuestion = require('../questions/profile-question')

const { nameQuestion, oldQuestion, cityQuestion } = profileQuestion

const main = new Menu("root-profile-menu").submenu('Изменить профиль ⚙️', 'settings-profile-submenu')

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

const settingsSubmenu = new Menu("settings-profile-submenu")
    .text("😌 Имя", async (ctx) => {
        return await nameQuestion.replyWithMarkdown(ctx, 'Пожалуйста введите своё имя')
    }).row()
    .text("👵 Возраст️", async (ctx) => {
        return await oldQuestion.replyWithMarkdown(ctx, 'Пожалуйста введите свой возраст в формате ДД.ММ.ГГГГ')
    }).row()
    .submenu('🏘️ город', 'settings-profile-cities-submenu').row()
    .back('<< Назад')

main.register([settingsSubmenu, citiesSubmenu])

module.exports = {
    profileMenu: main,
}