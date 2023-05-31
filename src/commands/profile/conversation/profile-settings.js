const { userKeyboard } = require('../../../common/keyboards')
const { isNameValid, isOldValid } = require('../../../validators/index')
const { locationKeyboard } = require('../keyboards/index')
const api = require('../../../api/api')

const nameConversation = async (conversation, ctx) => {
    while (true) {
        const { message, from } = await conversation.wait()
        const { text } = message

        if (text === ctx.t('common.cancel')) {
            break
        }

        if (!isNameValid(text)) {
            await ctx.reply(ctx.t('profile.name_failure'))
            continue
        }

        await api.usersService.updateUser(from.id, { name: text })

        await ctx.reply(ctx.t('profile.name_success', { name: text }), {
            reply_markup: userKeyboard(ctx),
            parse_mode: 'HTML',
        })

        break
    }
}

const oldConversation = async (conversation, ctx) => {
    while (true) {
        const { message, from } = await conversation.wait()
        const { text } = message

        if (text === ctx.t('common.cancel')) {
            break
        }

        if (!isOldValid(Number(text))) {
            await ctx.reply(ctx.t('profile.old_failure'))
            continue
        }

        await api.usersService.updateUser(from.id, { old: text })

        await ctx.reply(ctx.t('profile.old_success'), {
            reply_markup: userKeyboard(ctx),
        })
        break
    }
}

const genderConversation = async (conversation, ctx) => {
    while (true) {
        const { message, from } = await conversation.wait()
        const { text } = message

        if (text === ctx.t('common.cancel')) {
            break
        }

        if (ctx.t('common.keyboard_gender_male') === text) {
            await api.usersService.updateUser(from.id, {
                gender: 'male',
            })

            await ctx.reply(ctx.t('profile.gender_success'), {
                reply_markup: userKeyboard(ctx),
            })
            break
        }

        if (ctx.t('common.keyboard_gender_female') === text) {
            await api.usersService.updateUser(from.id, {
                gender: 'female',
            })

            await ctx.reply(ctx.t('profile.gender_success'), {
                reply_markup: userKeyboard(ctx),
            })
            break
        }

        await ctx.reply(ctx.t('profile.gender_failure'))
    }
}

const cityConversation = async (conversation, ctx) => {
    while (true) {
        const { message, from } = await conversation.wait()
        const { text, location } = message

        if (text === ctx.t('common.cancel')) {
            break
        }

        if (!location) {
            await ctx.reply(ctx.t('profile.location_failure'), {
                reply_markup: locationKeyboard(ctx),
            })
            continue
        }

        const { id } = from
        const { latitude: lat, longitude: long } = location

        const { data } = await api.geoService.getLocationByLatLong({
            lat,
            long,
        })

        // TODO save city by user local
        const city = data[0].local_names.ru

        await api.usersService.updateUser(id, {
            city,
        })

        await ctx.reply(ctx.t('profile.location_success'), {
            reply_markup: userKeyboard(ctx),
        })
        break
    }
}

const photoConversation = async (conversation, ctx) => {
    while (true) {
        const { message, from } = await conversation.wait()
        const { text, photo } = message

        if (text === ctx.t('common.cancel')) {
            break
        }

        if (!photo) {
            await ctx.reply(ctx.t('profile.photo_failure'))
            continue
        }

        const { file_id } = photo[0]

        await api.usersService.updateUser(from.id, {
            images: file_id,
        })

        await ctx.reply(ctx.t('profile.photo_success'), {
            reply_markup: userKeyboard(ctx),
        })
        break
    }
}

module.exports = {
    nameConversation,
    oldConversation,
    genderConversation,
    cityConversation,
    photoConversation,
}
