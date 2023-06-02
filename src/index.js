const { Bot, session } = require('grammy')
const { conversations } = require('@grammyjs/conversations')
const { I18n } = require('@grammyjs/i18n')
const { hydrateFiles } = require('@grammyjs/files')

const profile = require('./commands/profile/index')
const filters = require('./commands/filters/index')
const start = require('./commands/start/index')
const search = require('./commands/search/index')

require('dotenv').config()

const bot = new Bot(process.env.TOKEN)

bot.api.config.use(hydrateFiles(bot.token))

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

bot.use(async (ctx, next) => {
    const { conversation } = ctx
    const { update } = ctx
    const active = await conversation.active()

    if (Object.values(active).length > 0 && update.callback_query) {
        await conversation.exit()
    }

    return next()
})

// commands
bot.use(start)
bot.use(profile)
bot.use(filters)
bot.use(search)

bot.catch((err) => {
    const ctx = err.ctx
    const e = err.error

    console.log(e)
    ctx.reply(ctx.t('common.error'), {
        reply_markup: { remove_keyboard: true },
    })
})

bot.api.setMyCommands([
    { command: 'start', description: 'Начать' },
    { command: 'profile', description: 'Мой профиль' },
    { command: 'filters', description: 'Мои фильтры' },
])

bot.start()
