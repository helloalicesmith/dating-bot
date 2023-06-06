const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: path.join(__dirname, '../.env') })

const { Bot, session } = require('grammy')
const { conversations } = require('@grammyjs/conversations')
const { I18n } = require('@grammyjs/i18n')

const profile = require('./commands/profile/index')
const filters = require('./commands/filters/index')
const start = require('./commands/start/index')
const search = require('./commands/search/index')
const { searchKeyboard } = require('./common/keyboards')

const token =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_TOKEN
        : process.env.TOKEN

const bot = new Bot(token)

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
    const { callback_query, message } = update
    const active = await conversation.active()

    const isCallbackQuery = Object.values(active).length > 0 && callback_query
    const isCancel =
        Object.values(active).length > 0 &&
        message?.text === ctx.t('common.cancel')
    const isCommand =
        Object.values(active).length > 0 &&
        message?.text &&
        message.text[0] === '/'

    if (isCancel || isCallbackQuery || isCommand) {
        await conversation.exit()
    }

    return next()
})

bot.use(async (ctx, next) => {
    const { update } = ctx
    const { message } = update
    const isCancel = message?.text === ctx.t('common.cancel')

    if (isCancel) {
        await ctx.reply(ctx.t('common.cancel_confirm'), {
            reply_markup: searchKeyboard(ctx),
        })
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
