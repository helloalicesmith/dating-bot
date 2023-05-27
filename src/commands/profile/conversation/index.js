const { createConversation } = require('@grammyjs/conversations')

const Composer = require('../../../composer.js')
const {
    nameConversation,
    oldConversation,
    genderConversation,
} = require('./profile-settings.js')

const composer = new Composer()

composer.use(createConversation(nameConversation))
composer.use(createConversation(oldConversation))
composer.use(createConversation(genderConversation))

module.exports = composer
