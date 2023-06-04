const { Keyboard } = require('grammy')

const searchKeyboard = (ctx) =>
    new Keyboard().text(ctx.t('common.keyboard_search')).resized()

const genderKeyboard = (ctx) =>
    new Keyboard()
        .text(ctx.t('common.keyboard_gender_male'))
        .text(ctx.t('common.keyboard_gender_female'))
        .text(ctx.t('common.cancel'))
        .resized()
        .oneTime()

const cancelKeyboard = (ctx) =>
    new Keyboard().text(ctx.t('common.cancel')).resized().oneTime()

module.exports = {
    searchKeyboard,
    genderKeyboard,
    cancelKeyboard,
}
