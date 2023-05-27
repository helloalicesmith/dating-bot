const { Bot, session } = require('grammy')
const { conversations } = require('@grammyjs/conversations')
const { I18n } = require('@grammyjs/i18n')

const profile = require('./commands/profile/index')
const filters = require('./commands/filters/index')
const start = require('./commands/start/index')
const search = require('./commands/search/index')

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

// commands
bot.use(start)
bot.use(profile)
bot.use(filters)
bot.use(search)

bot.catch((err) => {
    const ctx = err.ctx
    const e = err.error

    console.log(e)
    ctx.reply(ctx.t('common.error'))
})

bot.api.setMyCommands([
    { command: 'start', description: 'Начать' },
    { command: 'profile', description: 'Мой профиль' },
    { command: 'filters', description: 'Мои фильтры' },
])

bot.start()
