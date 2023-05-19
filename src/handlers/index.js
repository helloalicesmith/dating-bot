const Composer = require('../composer.js')
const userOptions = require('./user-options.js')
const profile = require('./profile.js')

const composer = new Composer()

composer
  .on('message')
  .use(userOptions)
  .use(profile)

module.exports = composer