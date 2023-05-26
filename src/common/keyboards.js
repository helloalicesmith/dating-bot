const { Keyboard } = require('grammy')

const userKeyboard = (ctx) =>
    new Keyboard().text(ctx.t('keyboard.main-search')).resized()

const genderKeyboard = (ctx) =>
    new Keyboard()
        .text(ctx.t('keyboard.settings-gender-male'))
        .text(ctx.t('keyboard.settings-gender-female'))
        .resized()
        .oneTime()

module.exports = {
    userKeyboard,
    genderKeyboard,
}
