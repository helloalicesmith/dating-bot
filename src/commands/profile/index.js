const Composer = require('../../composer.js')
const { composer: menu, profileMenu } = require('./menu/index.js')
const conversation = require('./conversation/index.js')
const api = require('../../api/api.js')

const composer = new Composer()

const profileCommand = async (ctx) => {
    const { id } = ctx.message.from
    const { data } = await api.usersService.getUserProfile(id)
    const { name, old, gender, city, images } = data
    let tGender = ''

    ctx.session.user = data

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
        imagesCount: images.length,
    })

    await ctx.reply(profile, { reply_markup: profileMenu, parse_mode: 'HTML' })
}

composer.use(conversation)
composer.use(menu)

composer.command(['profile'], profileCommand)

module.exports = composer
