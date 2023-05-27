const { locationKeyboard, genderKeyboard } = require('../keyboards/index')

const settingsNameHandler = async (ctx) => {
    await ctx.reply(ctx.t('profile.menu_settings_confirm'))

    return await ctx.conversation.enter('nameConversation')
}

const settingsOldHandler = async (ctx) => {
    await ctx.reply(ctx.t('profile.menu_settings_old_confirm'))

    return await ctx.conversation.enter('oldConversation')
}

const settingsGenderHandler = async (ctx) => {
    const keyboard = genderKeyboard(ctx)

    await ctx.reply(ctx.t('profile.menu_settings_gender_confirm'), {
        reply_markup: keyboard,
    })

    return await ctx.conversation.enter('genderConversation')
}

const settingsCitiesHandler = async (ctx) => {
    return await ctx.reply(ctx.t('profile.menu_settings_city_confirm'), {
        reply_markup: locationKeyboard,
    })
}
module.exports = {
    settingsNameHandler,
    settingsOldHandler,
    settingsGenderHandler,
    settingsCitiesHandler,
}
