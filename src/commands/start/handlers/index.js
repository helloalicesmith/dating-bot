const { searchKeyboard } = require('../../../common/keyboards')
const api = require('../../../api/api')

const startHandler = async (ctx) => {
    const { id } = ctx.message.from

    try {
        const { data } = await api.usersService.getUserProfile(id)

        const text =
            data.name ??
            ctx.t('start.hello_again', {
                name: data.name ? `, ${data.name}` : '',
            })

        await ctx.reply(text, {
            parse_mode: 'HTML',
            reply_markup: searchKeyboard(ctx),
        })
    } catch (err) {
        if (err.response.status === 404) {
            await api.usersService.createUser({
                id,
            })

            await ctx.reply(ctx.t('start.hello'), {
                parse_mode: 'HTML',
                reply_markup: searchKeyboard(ctx),
            })
            return
        }

        throw err
    }
}

module.exports = {
    startHandler,
}
