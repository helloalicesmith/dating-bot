const Composer = require('../composer.js')
const { menu } = require("../menu/profile-menu.js");
const { USER_OPTIONS } = require('../constants.js')
const { getUserProfileToHTML } = require('../helpers/html-helper.js')
const { userToProfileObject } = require('../mappers/user.js')
const api = require('../api/api.js')

const composer = new Composer().on('message')

const getMyProfileOptions = async (ctx) => {
    const { username } = ctx.message.from
    const { data } = await api.usersService.getUserProfile(username)
    const html = getUserProfileToHTML(userToProfileObject(data))

    await ctx.reply(html, { reply_markup: menu, parse_mode: 'HTML' });
}

const getMyProfileFilter = async (ctx) => {
    await ctx.reply('Этот функционал еще не сделан :(')
}

const searchUser = async (ctx) => {
    await ctx.reply('Этот функционал еще не сделан :(')
}

composer.hears(USER_OPTIONS.myProfile, getMyProfileOptions)
composer.hears(USER_OPTIONS.myFilters, getMyProfileFilter)
composer.hears(USER_OPTIONS.search, searchUser)

module.exports = composer