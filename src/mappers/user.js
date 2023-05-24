const userToProfileObject = (ctx, user) => ({
    [ctx.t('profile.field-name')]: user.name,
    [ctx.t('profile.field-old')]: user.birthday,
})

module.exports = {
    userToProfileObject,
}
