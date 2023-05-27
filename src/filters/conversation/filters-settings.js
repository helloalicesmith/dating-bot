const { userKeyboard } = require('../../common/keyboards')
const api = require('../../api/api')

const filtersOldConversation = async (conversation, ctx) => {
    const { message, from } = await conversation.wait()

    const old = message.text

    await api.filtersService.updateFilters(from.id, {
        old,
    })

    return await ctx.reply(ctx.t('filters.add_success'), {
        reply_markup: userKeyboard(ctx),
    })
}

const filtersGenderConversation = async (conversation, ctx) => {
    while (true) {
        const { message, from } = await conversation.wait()

        if (ctx.t('common.keyboard_gender_male') === message.text) {
            await api.filtersService.updateFilters(from.id, {
                gender: 'male',
            })

            await ctx.reply(ctx.t('profile.gender_success'), {
                reply_markup: userKeyboard(ctx),
            })
            break
        }

        if (ctx.t('common.keyboard_gender_female') === message.text) {
            await api.filtersService.updateFilters(from.id, {
                gender: 'female',
            })

            await ctx.reply(ctx.t('profile.gender_success'), {
                reply_markup: userKeyboard(ctx),
            })
            break
        }

        await ctx.reply(ctx.t('profile.gender_failure'))
    }
}

module.exports = {
    filtersOldConversation,
    filtersGenderConversation,
}
