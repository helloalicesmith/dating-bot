const { userKeyboard } = require('../keyboards/user-keyboard')
const Composer = require('../composer.js')
const api = require("../api/api.js");

const composer = new Composer().on('message')

const checkProfile = async (ctx) => {
    const { username: username_tg } = ctx.message.from
    const { data } = await api.usersService.getUserProfile(username_tg)

    const text = data ? `С возвращением ${data.name ?? ''}! 🤟 ` : 'Привет! Прежде чем начать, заполни свой профиль 🤓'

    if (!data) {
        await api.usersService.createUser({
            username_tg
        })
    }

    await ctx.reply(text, {
        reply_markup: userKeyboard
    });
}

composer.command(['start'], checkProfile)

module.exports = composer