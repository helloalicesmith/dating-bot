const { genderKeyboard } = require('../../../common/keyboards')

const filtersOldHandler = async (ctx) => {
    await ctx.reply(ctx.t('filters.old_confirm'))

    return await ctx.conversation.enter('filtersOldConversation')
}

const filtersGenderHandler = async (ctx) => {
    const keyboard = genderKeyboard(ctx)

    await ctx.reply(ctx.t('filters.gender_confirm'), {
        reply_markup: keyboard,
    })

    return await ctx.conversation.enter('filtersGenderConversation')
}

const filtersCityHandler = async (ctx) => {
    return await ctx.reply(ctx.t('filters.city_confirm'))
}

module.exports = {
    filtersOldHandler,
    filtersGenderHandler,
    filtersCityHandler,
}
