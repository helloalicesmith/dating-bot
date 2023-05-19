const { Menu } = require("@grammyjs/menu")

const profileQuestion = require('../questions/profile-question')

const { nameQuestion, oldQuestion } = profileQuestion

const main = new Menu("root-profile-menu").submenu('Изменить профиль ⚙️', 'settings-profile-menu')

const settings = new Menu("settings-profile-menu")
    .text("😌 Имя", (ctx) => {
        return nameQuestion.replyWithMarkdown(ctx, 'Пожалуйста введите своё имя')
    }).row()
    .text("👵 Возраст️", (ctx) => {
        return oldQuestion.replyWithMarkdown(ctx, 'Пожалуйста введите свой возраст в формате ДД.ММ.ГГГГ')
    }).row()
    .text("🏘️ Город", (ctx) => {
        return oldQuestion.replyWithMarkdown(ctx, 'Пожалуйста введите название города')
    }).row()
    .back('<< Назад')

main.register(settings)

module.exports = {
    menu: main,
}