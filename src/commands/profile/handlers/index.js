const { cancelKeyboard } = require('../../../common/keyboards')
const { locationKeyboard, genderKeyboard } = require('../keyboards/index')

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
    await ctx.reply(ctx.t('profile.menu_settings_photo_confirm'), {
        reply_markup: genderKeyboard(ctx),
    })

    return await ctx.conversation.enter('photoConversation')
}

module.exports = {
    settingsNameHandler,
    settingsOldHandler,
    settingsGenderHandler,
    settingsCitiesHandler,
    settingsPhotoHandler,
}
