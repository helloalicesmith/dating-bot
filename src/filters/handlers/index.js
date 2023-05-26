const { genderKeyboard } = require('../../common/keyboards')

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

module.exports = {
    filtersOldHandler,
    filtersGenderHandler,
}
