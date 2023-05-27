const { userKeyboard } = require('../../common/keyboards')
const { isNameValid, isOldValid } = require('../../validators/index')
const api = require('../../api/api')

const nameConversation = async (conversation, ctx) => {
    while (true) {
        const { message, from } = await conversation.wait()
        const name = message.text

        if (!isNameValid(name)) {
            await ctx.reply(ctx.t('profile.name_failure'))
            continue
        }

        await api.usersService.updateUser(from.id, { name })

        await ctx.reply(ctx.t('profile.name_success', { name }), {
            reply_markup: userKeyboard(ctx),
            parse_mode: 'HTML',
        })
        break
    }
}

const oldConversation = async (conversation, ctx) => {
    while (true) {
        const { message, from } = await conversation.wait()

        const old = message.text

        if (!isOldValid(Number(old))) {
            await ctx.reply(ctx.t('profile.old_failure'))
            continue
        }

        await api.usersService.updateUser(from.id, { old })

        await ctx.reply(ctx.t('profile.old_success'), {
            reply_markup: userKeyboard(ctx),
        })
        break
    }
}

const genderConversation = async (conversation, ctx) => {
    while (true) {
        const { message, from } = await conversation.wait()

        if (ctx.t('common.keyboard_gender_male') === message.text) {
            await api.usersService.updateUser(from.id, {
                gender: 'male',
            })

            await ctx.reply(ctx.t('profile.gender_success'), {
                reply_markup: userKeyboard(ctx),
            })
            break
        }

        if (ctx.t('common.keyboard_gender_female') === message.text) {
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

module.exports = {
    nameConversation,
    oldConversation,
    genderConversation,
}
