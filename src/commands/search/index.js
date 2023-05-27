const { hears } = require('@grammyjs/i18n')

const api = require('../../api/api')
const Composer = require('../../composer.js')

const composer = new Composer()

const searchCommand = async (ctx) => {
    try {
        const { id } = ctx.message.from
        const { data } = await api.searchService.getSearchUsers(id)

        if (!data) {
            return await ctx.reply(ctx.t('search.noresult'))
        }

        return await ctx.reply(
            ctx.t('search.profile', {
                name: data.name,
                old: data.old,
            }),
            { parse_mode: 'HTML' }
        )
    } catch (err) {
        if (err.response.data.error === 'filters_is_empty') {
            return await ctx.reply(ctx.t('search.empty_filters'))
        }

        if (err.response.data.error === 'profile_is_empty') {
            return await ctx.reply(ctx.t('search.empty_profile'))
        }

        throw err
    }
}

composer.filter(hears('common.keyboard_search'), searchCommand)

module.exports = composer
