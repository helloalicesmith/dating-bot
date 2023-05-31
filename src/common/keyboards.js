const { Keyboard } = require('grammy')

const userKeyboard = (ctx) =>
    new Keyboard().text(ctx.t('common.keyboard_search')).resized()

const genderKeyboard = (ctx) =>
    new Keyboard()
        .text(ctx.t('common.keyboard_gender_male'))
        .text(ctx.t('common.keyboard_gender_female'))
        .resized()
        .oneTime()

const cancelKeyboard = (ctx) =>
    new Keyboard().text(ctx.t('common.cancel')).resized().oneTime()

module.exports = {
    userKeyboard,
    genderKeyboard,
    cancelKeyboard,
}
