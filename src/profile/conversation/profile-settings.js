const { userKeyboard } = require('../../common/keyboards')
const api = require('../../api/api')

const nameConversation = async (conversation, ctx) => {
    const { message, from } = await conversation.wait()
    const name = message.text

    await api.usersService.updateUser(from.id, { name })

    return await ctx.reply(`Ваше имя успешно обновлено, <b>${name}</b>!`, {
        reply_markup: userKeyboard(ctx),
        parse_mode: 'HTML',
    })
}

const oldConversation = async (conversation, ctx) => {
    const { message, from } = await conversation.wait()

    const old = message.text

    await api.usersService.updateUser(from.id, { old })

    return await ctx.reply(ctx.t('profile.old-added'), {
        reply_markup: userKeyboard(ctx),
    })
}

const genderConversation = async (conversation, ctx) => {
    while (true) {
        const { message, from } = await conversation.wait()

        if (ctx.t('keyboard.settings-gender-male') === message.text) {
            await api.usersService.updateUser(from.id, {
                gender: 'male',
            })

            await ctx.reply(ctx.t('profile.gender-added'), {
                reply_markup: userKeyboard(ctx),
            })
            break
        }

        if (ctx.t('keyboard.settings-gender-female') === message.text) {
            await api.usersService.updateUser(from.id, {
                gender: 'female',
            })

            await ctx.reply(ctx.t('profile.gender-added'), {
                reply_markup: userKeyboard(ctx),
            })
            break
        }

        await ctx.reply(ctx.t('profile.gender-error'))
    }
}

module.exports = {
    nameConversation,
    oldConversation,
    genderConversation,
}
