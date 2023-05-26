const { Keyboard } = require('grammy')

const genderKeyboard = (ctx) =>
    new Keyboard()
        .text(ctx.t('keyboard.settings-gender-male'))
        .text(ctx.t('keyboard.settings-gender-female'))
        .resized()
        .oneTime()

module.exports = {
    genderKeyboard,
}
