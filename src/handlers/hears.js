const Composer = require('../composer.js')
const { profileMenu } = require("../menu/profile-menu.js");
const { USER_OPTIONS } = require('../constants.js')
const { getUserProfileToHTML } = require('../helpers/html-helper.js')
const { userToProfileObject } = require('../mappers/user.js')
const composer = new Composer().on('message')

const searchUser = async (ctx) => {
    await ctx.reply('Этот функционал еще не сделан :(')
}

composer.hears(USER_OPTIONS.search, searchUser)

module.exports = composer