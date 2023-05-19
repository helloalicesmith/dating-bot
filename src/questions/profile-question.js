const { StatelessQuestion } = require("@grammyjs/stateless-question")
const parse = require('date-fns/parse')

const citiesJson = require('../data/russian-cities.json')
const { userKeyboard } = require('../keyboards/user-keyboard')
const api = require('../api/api')

const nameQuestion = new StatelessQuestion("name", async (ctx) => {
    const { username: username_tg } = ctx.message.from
    const name = ctx.message.text

    await api.usersService.updateUser(username_tg, { name })

    await ctx.reply(`Ваше имя успешно обновлено, <b>${name}</b>!`, { reply_markup: userKeyboard, parse_mode: 'HTML' })
});

const oldQuestion = new StatelessQuestion("old", async (ctx) => {
    const date = parse(ctx.message.text, 'dd.MM.yyyy', new Date())

    await api.usersService.createUser({
        birthday: date
    })
});

const cityQuestion = new StatelessQuestion('city', async (ctx) => {
    console.log(citiesJson[0])
})

module.exports = {
   nameQuestion,
   oldQuestion,
   cityQuestion,
}