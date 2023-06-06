const Composer = require('../../composer.js')
const { composer: menu, profileMenu } = require('./menu')
const conversation = require('./conversation')
const { searchKeyboard } = require('../../common/keyboards.js')
const { photoDeleteMiddleware } = require('./middleware')
const api = require('../../api/api.js')

const composer = new Composer()

const profileCommand = async (ctx) => {
    const { id } = ctx.message.from
    const { data } = await api.usersService.getUserProfile(id)
    const { name, old, gender, city, images, description } = data
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
        description: description ?? ctx.t('profile.print_nullvalue'),
        imagesCount: images.length,
    })

    await ctx.reply(profile, {
        reply_markup: profileMenu,
        parse_mode: 'HTML',
    })
    await ctx.reply(ctx.t('profile.menu_settings_confirm'), {
        reply_markup: searchKeyboard(ctx),
    })
}

composer.use(conversation)
composer.use(menu)
composer.use(photoDeleteMiddleware)

composer.command(['profile'], profileCommand)

module.exports = composer
