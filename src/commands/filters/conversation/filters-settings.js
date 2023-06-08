const { searchKeyboard } = require('../../../common/keyboards')
const { isOldValid } = require('../../../validators/index')
const api = require('../../../api/api')

const filtersOldConversation = async (conversation, ctx) => {
    while (true) {
        const { message, from } = await conversation.wait()

        const old = message.text

        if (!isOldValid(Number(old))) {
            await ctx.reply(ctx.t('filters.old_failure'))
            continue
        }

        await api.usersService.updateFilters(from.id, {
            old,
        })

        await ctx.reply(ctx.t('filters.add_success'), {
            reply_markup: searchKeyboard(ctx),
        })
        break
    }
}

const filtersGenderConversation = async (conversation, ctx) => {
    while (true) {
        const { message, from } = await conversation.wait()

        if (ctx.t('common.keyboard_gender_male') === message.text) {
            await api.usersService.updateFilters(from.id, {
                gender: 'male',
            })

            await ctx.reply(ctx.t('filters.gender_success'), {
                reply_markup: searchKeyboard(ctx),
            })
            break
        }

        if (ctx.t('common.keyboard_gender_female') === message.text) {
            await api.usersService.updateFilters(from.id, {
                gender: 'female',
            })

            await ctx.reply(ctx.t('filters.gender_success'), {
                reply_markup: searchKeyboard(ctx),
            })
            break
        }

        await ctx.reply(ctx.t('filters.gender_failure'))
    }
}

module.exports = {
    filtersOldConversation,
    filtersGenderConversation,
}
