const { searchKeyboard } = require('../../../common/keyboards')
const { isNameValid, isOldValid } = require('../../../validators')
const {
    locationKeyboard,
    photoKeyboard,
    photoDeleteInlineKeyboard,
} = require('../keyboards')
const api = require('../../../api/api')

const nameConversation = async (conversation, ctx) => {
    while (true) {
        const q = await conversation.waitFor('message:text')
        const { message, from } = q
        const { text } = message

        if (!isNameValid(text)) {
            await ctx.reply(ctx.t('profile.name_failure'))
            continue
        }

        await conversation.external(() =>
            api.usersService.updateUser(from.id, { name: text })
        )

        await ctx.reply(ctx.t('profile.name_success', { name: text }), {
            reply_markup: searchKeyboard(ctx),
            parse_mode: 'HTML',
        })

        break
    }
}

const oldConversation = async (conversation, ctx) => {
    while (true) {
        const { message, from } = await conversation.waitFor('message:text')
        const { text } = message

        if (!isOldValid(Number(text))) {
            await ctx.reply(ctx.t('profile.old_failure'))
            continue
        }

        await conversation.external(() =>
            api.usersService.updateUser(from.id, { old: text })
        )

        await ctx.reply(ctx.t('profile.old_success'), {
            reply_markup: searchKeyboard(ctx),
        })
        break
    }
}

const genderConversation = async (conversation, ctx) => {
    while (true) {
        const { message, from } = await conversation.waitFor('message:text')
        const { text } = message

        if (ctx.t('common.keyboard_gender_male') === text) {
            await conversation.external(() =>
                api.usersService.updateUser(from.id, {
                    gender: 'male',
                })
            )

            await ctx.reply(ctx.t('profile.gender_success'), {
                reply_markup: searchKeyboard(ctx),
            })
            break
        }

        if (ctx.t('common.keyboard_gender_female') === text) {
            await conversation.external(() =>
                api.usersService.updateUser(from.id, {
                    gender: 'female',
                })
            )

            await ctx.reply(ctx.t('profile.gender_success'), {
                reply_markup: searchKeyboard(ctx),
            })
            break
        }

        await ctx.reply(ctx.t('profile.gender_failure'))
    }
}

const cityConversation = async (conversation, ctx) => {
    while (true) {
        const { message, from } = await conversation.waitFor('message:location')
        const { location } = message

        if (!location) {
            await ctx.reply(ctx.t('profile.location_failure'), {
                reply_markup: locationKeyboard(ctx),
            })
            continue
        }

        const { id } = from
        const { latitude, longitude } = location

        const { data } = await conversation.external(() =>
            api.geoService.getLocationByLatLong({
                lat: latitude,
                long: longitude,
            })
        )

        if (!data || data.length === 0) {
            break
        }

        const { lat, lon, country, name, local_names } = data[0]

        await conversation.external(() =>
            api.usersService.updateUser(id, {
                location: {
                    lat,
                    lon,
                    country,
                    name,
                    local_names: local_names, // [from.language_code] || local_names.en,
                },
            })
        )

        await ctx.reply(ctx.t('profile.location_success'), {
            reply_markup: searchKeyboard(ctx),
        })
        break
    }
}

const photoConversation = async (conversation, ctx) => {
    while (true) {
        const currentCtx = await conversation.wait()
        const { message, from } = currentCtx

        const { text, photo } = message
        const { images } = conversation.session.user

        if (text === ctx.t('common.done')) {
            await ctx.reply(ctx.t('profile.photo_settings_cancel'), {
                reply_markup: searchKeyboard(ctx),
            })
            break
        }

        if (text === ctx.t('profile.keyboard_show_all_photo')) {
            for (const idx in images) {
                await ctx.replyWithPhoto(images[idx], {
                    reply_markup: photoDeleteInlineKeyboard(ctx, idx),
                })
            }

            continue
        }

        if (!photo || text) {
            await ctx.reply(ctx.t('profile.photo_add_failure'), {
                reply_markup: photoKeyboard(ctx),
            })
            continue
        }

        if (photo && images.length < 3) {
            const newImages = [...images, photo[0].file_id]

            conversation.session.user.images = newImages
            await conversation.external(() =>
                api.usersService.updateUser(from.id, {
                    images: newImages,
                })
            )

            await ctx.reply(ctx.t('profile.photo_add_success'), {
                reply_markup: photoKeyboard(ctx),
            })

            continue
        }
    }
}

const descriptionConversation = async (conversation, ctx) => {
    while (true) {
        const { message, from } = await conversation.waitFor('message:text')
        const { text } = message

        if (text.length > 200) {
            await ctx.reply(ctx.t('profile.menu_settings_description_failure'))
            continue
        }

        await conversation.external(() =>
            api.usersService.updateUser(from.id, { description: text })
        )

        await ctx.reply(ctx.t('profile.menu_settings_description_success'), {
            reply_markup: searchKeyboard(ctx),
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
    descriptionConversation,
}
