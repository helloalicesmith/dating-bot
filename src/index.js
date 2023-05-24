const { Bot, session } = require('grammy')
const { conversations } = require('@grammyjs/conversations')
const { I18n } = require('@grammyjs/i18n')

const userConversations = require('./conversation/index')
const menu = require('./menu/index')
const handlers = require('./handlers/index')
const questions = require('./questions/index')
require('dotenv').config()

const bot = new Bot(process.env.TOKEN)

const i18n = new I18n({
    defaultLocale: 'ru',
    directory: 'locales',
})

bot.use(
    session({
        initial: () => ({}),
    })
)

bot.use(i18n)

bot.use(conversations())
bot.use(userConversations)

bot.use(menu)
bot.use(questions)
bot.use(handlers)

bot.api.setMyCommands([
    { command: 'start', description: 'Начать' },
    { command: 'profile', description: 'Мой профиль' },
    { command: 'filters', description: 'Мои фильтры' },
])

bot.start()
