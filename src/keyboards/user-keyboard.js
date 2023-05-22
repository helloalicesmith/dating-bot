const { Keyboard } = require("grammy");

const { USER_OPTIONS } = require('../constants')

const userKeyboard = new Keyboard().text(USER_OPTIONS.search).resized()

module.exports = {
    userKeyboard,
}