const { cancelKeyboard, genderKeyboard } = require('../../../common/keyboards')
const { locationKeyboard, photoKeyboard } = require('../keyboards/index')

const settingsNameHandler = async (ctx) => {
    await ctx.reply(ctx.t('profile.menu_settings_confirm'), {
        reply_markup: cancelKeyboard(ctx),
    })

    return await ctx.conversation.enter('nameConversation')
}

const settingsOldHandler = async (ctx) => {
    await ctx.reply(ctx.t('profile.menu_settings_old_confirm'), {
        reply_markup: cancelKeyboard(ctx),
    })

    return await ctx.conversation.enter('oldConversation')
}

const settingsGenderHandler = async (ctx) => {
    await ctx.reply(ctx.t('profile.menu_settings_gender_confirm'), {
        reply_markup: genderKeyboard(ctx),
    })

    return await ctx.conversation.enter('genderConversation')
}

const settingsCitiesHandler = async (ctx) => {
    await ctx.reply(ctx.t('profile.menu_settings_city_confirm'), {
        reply_markup: locationKeyboard(ctx),
    })

    return await ctx.conversation.enter('cityConversation')
}

const settingsPhotoHandler = async (ctx) => {
    const { images } = ctx.session.user

    for (const it of images) {
        await ctx.replyWithPhoto(it)
    }

    await ctx.reply(
        ctx.t('profile.menu_settings_photo_info', { images: images.length }),
        {
            reply_markup: photoKeyboard(ctx, images.length),
        }
    )

    return await ctx.conversation.enter('photoConversation')
}

const settingsDescriptionHandler = async (ctx) => {
    await ctx.reply(ctx.t('profile.menu_settings_description_confirm'), {
        reply_markup: cancelKeyboard(ctx),
    })

    return await ctx.conversation.enter('descriptionConversation')
}

module.exports = {
    settingsNameHandler,
    settingsOldHandler,
    settingsGenderHandler,
    settingsCitiesHandler,
    settingsPhotoHandler,
    settingsDescriptionHandler,
}
