const { userKeyboard } = require('../../../common/keyboards')
const api = require('../../../api/api')

const startHandler = async (ctx) => {
    const { id } = ctx.message.from

    const { data } = await api.usersService.getUserProfile(id)

    console.log(data)

    const text = data
        ? ctx.t('start.hello_again', {
              name: data.name ?? '',
          })
        : ctx.t('start.hello')

    if (!data) {
        await api.usersService.createUser({
            id,
        })
    }

    return await ctx.reply(text, {
        parse_mode: 'HTML',
        reply_markup: userKeyboard,
    })
}

module.exports = {
    startHandler,
}
