const { userKeyboard } = require('../common/keyboards')
const Composer = require('../composer.js')
const api = require('../api/api.js')

const { profileMenu } = require('../profile/menu/index')
const { filtersMenu } = require('../filters/menu/index')
const { getUserProfileToHTML } = require('../helpers/html.js')
const { userToProfileObject } = require('../mappers/user.js')

const composer = new Composer().on('message')

const start = async (ctx) => {
    const { id } = ctx.message.from

    const { data } = await api.usersService.getUserProfile(id)

    const text = data
        ? `С возвращением ${data.name ?? ''}! 🤟 `
        : 'Привет! Прежде чем начать, заполни свой профиль 🤓'

    if (!data) {
        await api.usersService.createUser({
            id,
        })
    }

    return await ctx.reply(text, {
        reply_markup: userKeyboard,
    })
}

const getProfile = async (ctx) => {
    const { id } = ctx.message.from
    const { data } = await api.usersService.getUserProfile(id)
    const html = getUserProfileToHTML(userToProfileObject(ctx, data))

    await ctx.reply(html, { reply_markup: profileMenu, parse_mode: 'HTML' })
}

const getFilters = async (ctx) => {
    const { id } = ctx.message.from

    const { data } = await api.filtersService.getUserFilters(id)

    if (!data) {
        await api.filtersService.createFilters(id, {})
    }

    return await ctx.reply(ctx.t('filters.menu_text'), {
        reply_markup: filtersMenu,
    })
}

composer.command(['start'], start)
composer.command(['profile'], getProfile)
composer.command(['filters'], getFilters)

module.exports = composer
