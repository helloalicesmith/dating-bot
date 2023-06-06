const api = require('../../../api/api')

const photoDeleteMiddleware = async (ctx, next) => {
    const { update } = ctx
    const { callback_query } = update
    const { from } = ctx

    const isProfilePhotoDelete =
        callback_query?.data &&
        callback_query.data.includes('profile-photo-delete')

    if (isProfilePhotoDelete) {
        const { images } = ctx.session.user
        const newImages = [...images]
        const data = callback_query.data
        const currentIdx = data[data.length - 1]

        newImages.splice(currentIdx, 1)

        await api.usersService.updateUser(from.id, {
            images: newImages,
        })

        ctx.session.user.images = newImages

        await ctx.answerCallbackQuery({
            text: ctx.t('profile.photo_delete_success'),
        })

        await ctx.deleteMessage()

        await ctx.reply(
            ctx.t('profile.menu_settings_photo_info', {
                images: newImages.length,
            })
        )

        return await ctx.conversation.enter('photoConversation')
    }

    return next()
}

module.exports = {
    photoDeleteMiddleware,
}
