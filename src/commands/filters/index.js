const Composer = require('../../composer.js')
const { composer: menu } = require('./menu/index.js')
const conversation = require('./conversation/index.js')
const { filtersMenu } = require('./menu/filters.js')
const api = require('../../api/api.js')

const composer = new Composer()

const filtersCommand = async (ctx) => {
    const { id } = ctx.message.from

    const { data } = await api.filtersService.getUserFilters(id)

    if (!data) {
        await api.filtersService.createFilters(id, {})
    }

    return await ctx.reply(ctx.t('filters.menu_text'), {
        reply_markup: filtersMenu,
    })
}

composer.use(conversation)
composer.use(menu)

composer.command(['filters'], filtersCommand)

module.exports = composer
