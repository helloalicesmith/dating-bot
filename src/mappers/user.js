const userToProfileObject = (user) => ({
    Имя: user.name,
    'Дата рождения': user.birthday,
})

module.exports = {
    userToProfileObject,
}
