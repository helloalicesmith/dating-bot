const { createConversation } = require('@grammyjs/conversations')

const Composer = require('../../../composer.js')
const {
    nameConversation,
    oldConversation,
    genderConversation,
    cityConversation,
    photoConversation,
} = require('./profile-settings.js')

const composer = new Composer()

composer.use(createConversation(nameConversation))
composer.use(createConversation(oldConversation))
composer.use(createConversation(genderConversation))
composer.use(createConversation(cityConversation))
composer.use(createConversation(photoConversation))

module.exports = composer
