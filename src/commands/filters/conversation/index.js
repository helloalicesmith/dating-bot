const { createConversation } = require('@grammyjs/conversations')

const Composer = require('../../../composer.js')
const {
    filtersOldConversation,
    filtersGenderConversation,
} = require('./filters-settings.js')

const composer = new Composer()

composer.use(createConversation(filtersOldConversation))
composer.use(createConversation(filtersGenderConversation))

module.exports = composer
