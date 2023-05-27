const { Keyboard } = require('grammy')

const locationKeyboard = (ctx) =>
    new Keyboard()
        .requestLocation(ctx.t('profile.keyboard_location'))
        .oneTime()
        .resized()

const genderKeyboard = (ctx) =>
    new Keyboard()
        .text(ctx.t('common.keyboard_gender_male'))
        .text(ctx.t('common.keyboard_gender_female'))
        .resized()
        .oneTime()

module.exports = {
    locationKeyboard,
    genderKeyboard,
}
