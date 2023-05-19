const getUserProfileToHTML = (user) => {
   let html = '<b>Ваш профиль 📋</b>\n'
   const nullValue = 'ничего нету 😧'

   for (const key in user) {
      const value = user[key]

      html += `<i>${key}</i>: <b>${value ?? nullValue}</b>\n`
   }

   html += '\n📌 Для того, что бы пользоваться ботом, убедитесь в том, что вы указали <b>все</b> данные'

   return html
}

module.exports = {
   getUserProfileToHTML,
}