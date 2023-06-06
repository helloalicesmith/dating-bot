const { InlineKeyboard, Keyboard } = require('grammy')

const locationKeyboard = (ctx) =>
    new Keyboard()
        .requestLocation(ctx.t('profile.keyboard_location'))
        .row()
        .text(ctx.t('common.cancel'))
        .oneTime()
        .resized()

const photoKeyboard = (ctx) => {
    const keyboard = new Keyboard()

    return keyboard
        .text(ctx.t('profile.keyboard_show_all_photo'))
        .row()
        .text(ctx.t('common.done'))
        .row()
        .resized()
}

const photoDeleteInlineKeyboard = (ctx, idx) => {
    const inlineKeyboard = new InlineKeyboard()
    inlineKeyboard.text(ctx.t('common.delete'), `profile-photo-delete-${idx}`)

    return inlineKeyboard
}

module.exports = {
    locationKeyboard,
    photoKeyboard,
    photoDeleteInlineKeyboard,
}
