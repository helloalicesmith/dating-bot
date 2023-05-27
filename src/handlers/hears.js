const { hears } = require('@grammyjs/i18n')

const Composer = require('../composer.js')
const api = require('../api/api.js')
const { userKeyboard } = require('../keyboards/user-keyboard.js')
const composer = new Composer().on('message')

const searchUser = async (ctx) => {
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

const getLocation = async (ctx) => {
    const { username: username_tg } = ctx.message.from
    const { latitude: lat, longitude: long } = ctx.message.location

    const { data } = await api.geoService.getLocationByLatLong({
        lat,
        long,
    })

    const city = data[0].local_names.ru

    await api.usersService.updateUser(username_tg, {
        city,
    })

    return await ctx.reply(ctx.t('profile.location_success'), {
        reply_markup: userKeyboard,
    })
}

composer.filter(hears('common.keyboard_search'), searchUser)
composer.on('msg:location', getLocation)

module.exports = composer
