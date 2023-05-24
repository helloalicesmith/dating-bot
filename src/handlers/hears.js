const { hears } = require('@grammyjs/i18n')

const Composer = require('../composer.js')
const api = require('../api/api.js')
const { userKeyboard } = require('../keyboards/user-keyboard.js')
const composer = new Composer().on('message')

const searchUser = async (ctx) => {
    await ctx.reply('Этот функционал еще не сделан :(')
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
