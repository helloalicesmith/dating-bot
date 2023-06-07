const { Keyboard } = require('grammy')

const searchKeyboard = (ctx) =>
    new Keyboard().text(ctx.t('common.keyboard_search')).resized().persistent()

const genderKeyboard = (ctx) =>
    new Keyboard()
        .text(ctx.t('common.keyboard_gender_male'))
        .text(ctx.t('common.keyboard_gender_female'))
        .text(ctx.t('common.cancel'))
        .resized()
        .oneTime()
        .persistent()

const cancelKeyboard = (ctx) =>
    new Keyboard().text(ctx.t('common.cancel')).resized().oneTime().persistent()

module.exports = {
    searchKeyboard,
    genderKeyboard,
    cancelKeyboard,
}
