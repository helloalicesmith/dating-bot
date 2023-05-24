const { userKeyboard } = require('../keyboards/user-keyboard')
const api = require('../api/api')

const nameConversation = async (conversation, ctx) => {
    const { message, from } = await conversation.wait();
    const name = message.text

    await api.usersService.updateUser(from.id, { name })

    return await ctx.reply(`Ваше имя успешно обновлено, <b>${name}</b>!`, { reply_markup: userKeyboard, parse_mode: 'HTML' })
}

const oldConversation = async (conversation, ctx) => {
    const { message, from } = await conversation.wait();

    const old = message.text

    await api.usersService.updateUser(from.id, { old })

    return await ctx.reply('Ваш возраст успешно обновлен!')
}

const genderConversation = async (conversation, ctx) => {
    while(true) {
        const { message, from } = await conversation.wait();

        if(ctx.t('keyboard.male') === message.text) {
            await api.usersService.updateUser(from.id, {
                gender: 'male'
            })
            return
        }

        if(ctx.t('keyboard.female') === message.text) {
            await api.usersService.updateUser(from.id, {
                gender: 'female'
            })
        }
        
        await ctx.reply('bad')
    }
}

module.exports = {
    nameConversation,
    oldConversation,
    genderConversation,
}