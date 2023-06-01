const { Keyboard } = require('grammy')

const locationKeyboard = (ctx) =>
    new Keyboard()
        .requestLocation(ctx.t('profile.keyboard_location'))
        .text(ctx.t('common.cancel'))
        .oneTime()
        .resized()

const photoKeyboard = (ctx, imagesCount) => {
    const keyboard = new Keyboard()

    new Array(imagesCount).fill(null).forEach((_, idx) => {
        const imagesCount = idx + 1

        keyboard.text(ctx.t('profile.keyboard_photo_delete', { imagesCount }))
    })

    return keyboard.text(ctx.t('common.cancel')).resized()
}

module.exports = {
    locationKeyboard,
    photoKeyboard,
}
