const isNameValid = (value) => {
    const reg = /^[a-zA-Z ]{1,16}$/

    return reg.test(value)
}

module.exports = { isNameValid }
