const { Bot } = require("grammy");

const menu = require("./menu/index");
const handlers = require("./handlers/index");
const questions = require("./questions/index");
require('dotenv').config()

const bot = new Bot(process.env.TOKEN);

bot.use(menu)
bot.use(questions)
bot.use(handlers)

bot.api.setMyCommands([
    { command: "start", description: 'Начать' },
    { command: "profile", description: 'Мой профиль' },
    { command: "filters", description: 'Мои фильтры' },
]);

bot.start();
