const isNameValid = (value) => {
    const reg = /^[a-zA-Zа-яА-Я ]{1,16}$/

    return reg.test(value)
}

const isOldValid = (value) => {
    const reg = /^(1[89]|[2-9][0-9])$/

    return reg.test(value)
}

module.exports = { isNameValid, isOldValid }
