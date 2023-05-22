const { userKeyboard } = require('../keyboards/user-keyboard')
const Composer = require('../composer.js')
const api = require("../api/api.js");

const { profileMenu } = require("../menu/profile-menu.js");
const { getUserProfileToHTML } = require('../helpers/html-helper.js')
const { userToProfileObject } = require('../mappers/user.js')

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

const getMyProfileOptions = async (ctx) => {
    const { username } = ctx.message.from
    const { data } = await api.usersService.getUserProfile(username)
    const html = getUserProfileToHTML(userToProfileObject(data))

    await ctx.reply(html, { reply_markup: profileMenu, parse_mode: 'HTML' });
}

const getMyProfileFilter = async (ctx) => {
    await ctx.reply('Этот функционал еще не сделан :(')
}

composer.command(['start'], checkProfile)
composer.command(['profile'], getMyProfileOptions)
composer.command(['filters'], getMyProfileFilter)

module.exports = composer