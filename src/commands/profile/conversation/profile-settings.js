const { userKeyboard } = require('../../../common/keyboards')
const { photoKeyboard } = require('../keyboards/index')
const { isNameValid, isOldValid } = require('../../../validators/index')
const { locationKeyboard } = require('../keyboards/index')
const api = require('../../../api/api')

const removeImagesById = (ctx, images) => async (idx) => {
    const { from } = ctx
    const newImages = [...images]

    newImages.splice(idx, 1)

    await api.usersService.updateUser(from.id, {
        images: newImages,
    })

    await ctx.reply(ctx.t('profile.photo_delete_success'), {
        reply_markup: photoKeyboard(ctx, newImages.length),
    })
}

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

const photoConversation = async (conversation) => {
    while (true) {
        const ctx = await conversation.wait()

        const { message, from } = ctx
        const { text, photo } = message
        const { images } = ctx.session.user

        const selectDeleteFirst = ctx.t('profile.keyboard_photo_delete', {
            imagesCount: 1,
        })
        const selectDeleteSecond = ctx.t('profile.keyboard_photo_delete', {
            imagesCount: 2,
        })
        const selectDeleteThird = ctx.t('profile.keyboard_photo_delete', {
            imagesCount: 3,
        })

        if (text === ctx.t('common.cancel')) {
            await ctx.reply(ctx.t('profile.photo_settings_cancel'), {
                reply_markup: userKeyboard(ctx),
            })
            break
        }

        if (images.length >= 3) {
            await ctx.reply(ctx.t('profile.photo_length_failure'))
            continue
        }

        const removeImagesByIdFc = removeImagesById(ctx, images)

        if (text === selectDeleteFirst) {
            await removeImagesByIdFc(0)
            continue
        }

        if (text === selectDeleteSecond) {
            removeImagesByIdFc(1)
            continue
        }

        if (text === selectDeleteThird) {
            removeImagesByIdFc(2)
            continue
        }

        if (!photo) {
            await ctx.reply(ctx.t('profile.photo_add_failure'))
            continue
        }
        if (photo && images.length >= 3) {
            await ctx.reply(ctx.t('profile.photo_length_failure'))
            continue
        }

        if (photo) {
            const newImages = [...images, photo[0].file_id]

            await api.usersService.updateUser(from.id, {
                images: newImages,
            })

            await ctx.reply(ctx.t('profile.photo_add_success'), {
                reply_markup: photoKeyboard(ctx, newImages.length),
            })
        }
    }
}

module.exports = {
    nameConversation,
    oldConversation,
    genderConversation,
    cityConversation,
    photoConversation,
}
