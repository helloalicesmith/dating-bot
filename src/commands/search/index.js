const { hears } = require('@grammyjs/i18n')

const {
    mapSearchProfile,
    getIsUserNotEmpty,
    getIsFiltersNotEmpty,
} = require('./helpers')
const api = require('../../api/api')
const Composer = require('../../composer.js')
const { searchRatingKeyboard } = require('./keyboards')

const composer = new Composer()

const searchCommand = async (ctx) => {
    const { id, language_code } = ctx.message.from
    const { data: user } = await api.usersService.getUserProfile(id)
    const { filters, ...restUser } = user

    const isUserNotEmpty = getIsUserNotEmpty(restUser)
    const isFiltersNotEmpty = getIsFiltersNotEmpty(filters)

    if (!isUserNotEmpty && !isFiltersNotEmpty) {
        await ctx.reply(ctx.t('search.empty_all'), {
            parse_mode: 'HTML',
        })
        return
    }

    if (!isUserNotEmpty) {
        await ctx.reply(ctx.t('search.empty_profile'))
        return
    }

    if (!isFiltersNotEmpty) {
        await ctx.reply(ctx.t('search.empty_filters'))
        return
    }

    const { data } = await api.searchService.getSearchUsers(id)

    if (!data) {
        await ctx.reply(ctx.t('search.noresult'))
        return
    }

    await ctx.reply(ctx.t('common.info'), {
        reply_markup: searchRatingKeyboard(ctx),
    })

    await ctx.replyWithMediaGroup(mapSearchProfile(ctx, data, language_code))
}

const likeCommand = async (ctx) => {
    await ctx.reply('оч')
}

const dislikeCommand = async (ctx) => {
    await ctx.reply('не оч')
}

composer.filter(hears('common.keyboard_search'), searchCommand)
composer.filter(hears('search.keyboard_like'), likeCommand)
composer.filter(hears('search.keyboard_dislike'), dislikeCommand)

module.exports = composer
