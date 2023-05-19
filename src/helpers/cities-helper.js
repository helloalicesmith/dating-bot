const citiesJson = require('../data/russian-cities.json')

const getCitiesByValue = (value = '', limit = 10) => {
    let count = 0
    const result = []

    for (const it of citiesJson) {
        const current = it.name.toLowerCase()

        if (count >= limit) {
            break
        }

        if (current.includes(value.toLowerCase())) {
            result.push(it)
            count += 1
        }
    }

    return result
}

module.exports = {
    getCitiesByValue,
}