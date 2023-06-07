const { hears } = require('@grammyjs/i18n')

const api = require('../../api/api')
const Composer = require('../../composer.js')
const { searchRatingKeyboard } = require('./keyboards')

const composer = new Composer()

const searchCommand = async (ctx) => {
    try {
        const { id, language_code } = ctx.message.from
        const { data } = await api.searchService.getSearchUsers(id)

        if (!data) {
            return await ctx.reply(ctx.t('search.noresult'))
        }

        const city = data?.location?.local_names[language_code]
        const mediaGroup = []

        for (const it of data.images) {
            mediaGroup.push({
                type: 'photo',
                media: it,
            })
        }

        await ctx.reply(ctx.t('common.info'), {
            reply_markup: searchRatingKeyboard(ctx),
        })

        mediaGroup[0] = {
            ...mediaGroup[0],
            caption: ctx.t('search.profile', {
                name: data.name,
                old: data.old,
                description: data.description,
                city,
            }),
            parse_mode: 'HTML',
        }

        await ctx.replyWithMediaGroup(mediaGroup)
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

const likeCommand = async (ctx) => {
    await ctx.reply('оч')
}

const dislikeCommand = async (ctx) => {
    await ctx.reply('не оч')
}

composer.filter(hears('common.keyboard_search'), searchCommand)
composer.filter(hears('common.like'), likeCommand)
composer.filter(hears('common.dislike'), dislikeCommand)

module.exports = composer
