const Composer = require('../../composer.js')
const { composer: menu, profileMenu } = require('./menu/index.js')
const conversation = require('./conversation/index.js')
const { userKeyboard } = require('../../common/keyboards.js')
const api = require('../../api/api.js')

const composer = new Composer()

const profileCommand = async (ctx) => {
    const { id } = ctx.message.from
    const { data } = await api.usersService.getUserProfile(id)

    const { name, old, gender, city } = data
    let tGender = ''

    if (gender === 'male') {
        tGender = ctx.t('profile.print_gender_male')
    }

    if (gender === 'female') {
        tGender = ctx.t('profile.print_gender_female')
    }

    const profile = ctx.t('profile.print_profile', {
        name: name ?? ctx.t('profile.print_nullvalue'),
        old: old ?? ctx.t('profile.print_nullvalue'),
        gender: tGender ?? ctx.t('profile.print_nullvalue'),
        city: city ?? ctx.t('profile.print_nullvalue'),
    })

    await ctx.reply(profile, { reply_markup: profileMenu, parse_mode: 'HTML' })
}

const getLocation = async (ctx) => {
    const { id } = ctx.message.from
    const { latitude: lat, longitude: long } = ctx.message.location

    const { data } = await api.geoService.getLocationByLatLong({
        lat,
        long,
    })

    // TODO save city by user local
    const city = data[0].local_names.ru

    await api.usersService.updateUser(id, {
        city,
    })

    return await ctx.reply(ctx.t('profile.location_success'), {
        reply_markup: userKeyboard,
    })
}

composer.use(conversation)
composer.use(menu)

composer.command(['profile'], profileCommand)
composer.on('msg:location', getLocation)

module.exports = composer
