const userToProfileObject = (ctx, user) => ({
    [ctx.t('profile.field_name')]: user.name,
    [ctx.t('profile.field_old')]: user.birthday,
})

module.exports = {
    userToProfileObject,
}
