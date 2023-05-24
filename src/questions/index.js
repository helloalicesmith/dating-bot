const Composer = require('../composer.js')
const profileQuestion = require('./profile-question.js')

const composer = new Composer()

Object.values(profileQuestion).forEach((it) => {
    composer.use(it.middleware())
})

module.exports = composer
