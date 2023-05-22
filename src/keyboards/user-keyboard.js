const { Keyboard } = require("grammy");

const { USER_OPTIONS } = require('../constants')

const userKeyboard = new Keyboard().text(USER_OPTIONS.search).resized()

const locationKeyboard = new Keyboard().requestLocation('Отправить геолокацию').resized()

module.exports = {
    userKeyboard,
    locationKeyboard,
}