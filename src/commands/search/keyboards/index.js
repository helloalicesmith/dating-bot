const { Keyboard } = require('grammy')

const searchRatingKeyboard = (ctx) =>
    new Keyboard()
        .text(ctx.t('search.keyboard_dislike'))
        .text(ctx.t('search.keyboard_like'))
        .resized()

module.exports = { searchRatingKeyboard }
