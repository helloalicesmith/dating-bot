const Composer = require('../../composer.js')
const { searchKeyboard } = require('../../common/keyboards.js')
const { composer: menu } = require('./menu')
const conversation = require('./conversation')
const { filtersMenu } = require('./menu')

const composer = new Composer()

const filtersCommand = async (ctx) => {
    await ctx.reply(ctx.t('filters.menu_text'), {
        reply_markup: filtersMenu,
    })

    await ctx.reply(ctx.t('common.info'), {
        reply_markup: searchKeyboard(ctx),
    })
}

composer.use(conversation)
composer.use(menu)

composer.command(['filters'], filtersCommand)

module.exports = composer
