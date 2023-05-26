const { Keyboard } = require('grammy')

const locationKeyboard = (ctx) =>
    new Keyboard()
        .requestLocation(ctx.t('keyboard.settings-location'))
        .resized()

const genderKeyboard = (ctx) =>
    new Keyboard()
        .text(ctx.t('keyboard.settings-gender-male'))
        .text(ctx.t('keyboard.settings-gender-female'))
        .resized()
        .oneTime()

module.exports = {
    locationKeyboard,
    genderKeyboard,
}
