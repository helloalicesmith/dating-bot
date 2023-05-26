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

        console.log(data)
        return await ctx.reply('good!')
    } catch (err) {
        if (err.response.data.error === 'filters is empty') {
            return await ctx.reply(ctx.t('search.empty_filters'))
        }

        if (err.response.data.error === 'profile is empty') {
            return await ctx.reply(ctx.t('empty_profile'))
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

    return await ctx.reply(ctx.t('profile.location-added'), {
        reply_markup: userKeyboard,
    })
}

composer.filter(hears('keyboard.main-search'), searchUser)
composer.on('msg:location', getLocation)

module.exports = composer
