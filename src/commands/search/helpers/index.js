const mapSearchProfile = (ctx, data, languageCode) => {
    const city = data?.location?.local_names[languageCode]
    const mediaGroup = []

    for (const it of data.images) {
        mediaGroup.push({
            type: 'photo',
            media: it,
        })
    }

    mediaGroup[0] = {
        ...mediaGroup[0],
        caption: ctx.t('search.profile', {
            name: data.name,
            old: data.old,
            description: data.description,
            city,
        }),
        parse_mode: 'HTML',
    }

    return mediaGroup
}

const getIsUserNotEmpty = (data) => {
    for (const key in data) {
        if (key === 'images' && data[key].length === 0) {
            return false
        }

        if (data[key] === null) {
            return false
        }
    }

    return true
}

const getIsFiltersNotEmpty = (data) => {
    if (!data) {
        return false
    }

    return !Object.values(data).some((it) => it === null)
}

module.exports = { mapSearchProfile, getIsUserNotEmpty, getIsFiltersNotEmpty }
