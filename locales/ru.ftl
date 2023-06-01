common =
    .keyboard_search = Искать! 🥰
    .keyboard_gender_male = Мужской
    .keyboard_gender_female = Женский
    .error = что то пошло не так. повторите попыткy
    .cancel = отмена
start =
    .hello = Привет! Прежде чем начать, заполни свой профиль 🤓
    .hello_again = С возвращением <b>{$name}</b>! 🤟 
profile =
    .menu_settings = Изменить данные профиля
    .menu_settings_photo = Изменить фото профиля
    .menu_settings_name = Имя
    .menu_settings_confirm = Пожалуйста введите своё имя
    .menu_settings_old = Возраст
    .menu_settings_old_confirm = Пожалуйста введите ваш возраст
    .menu_settings_gender = Пол
    .menu_settings_gender_confirm = Пожалуйста введите ваш пол
    .menu_settings_city = Добавить город
    .menu_settings_city_confirm = Пожалуйста добавте геолокацию
    .menu_settings_photo_confirm = Пожалуйста добавте фотографию
    .menu_settings_photo_info =
        { NUMBER($images, type: "ordinal") ->
            [0] У вас нету фотографий. Добавьте фотографии не больше 3
            [1] У вас одна фотография. Отправте новую фотографию или удалите существующую
            [2] У вас 2 фотографии. Отправте новую фотографию или удалите существующую
            [3] У вас 3 фотографии. Вы можете только удалить существующие фото, после чего прислать новое
            *[other] test
        }

    .print_gender_male = Мужчина
    .print_gender_female = Женщина
    .print_profile = <b>Ваш профиль 📋</b>
                     <b>Имя</b>: {$name}
                     <b>Возраст</b>: {$old}
                     <b>Пол</b>: {$gender}
                     <b>Город</b>: {$city}
                     <b>Количество фото</b>: {$imagesCount}
                     
                     📌 Для того, что бы пользоваться ботом, убедитесь в том, что вы указали <b>все</b> данные
    .print_nullvalue = ничего нету 😧
    .name_success = Ваше имя успешно обновлено, <b>{$name}</b>!
    .name_failure = Значение имени не верное, попробуйте еще раз
    .gender_success = Пол успешно добавлен !
    .gender_failure = Неверное значение, попробуйте еще раз
    .old_success = Ваш возраст успешно обновлен!
    .old_failure = Возраст введен неверно, попробуйте еще раз
    .location_success = Геолокация успешно добалена 👌🏻
    .location_failure = Не похоже на геолокацию, повторите попытку

    .photo_add_success = Фото успешно добавлено
    .photo_add_failure = Ошибка добавления фото, повторите попытку
    .photo_delete_success = Фото успешно удалено
    .photo_length_failure = У вас максимальное количество фотографий
    .photo_count = <b>{$count} фото</b>
    .photo_settings_cancel = Настройка фото завершена!
    
    .keyboard_location = Отправить геолокацию
    .keyboard_photo_add = Добавить фото
    .keyboard_photo_delete = Удалить {$imagesCount} фото
filters =
    .add_success = Фильтр успешно добавлен
    .old_confirm = Пожалуйста укажите возраст который вы ищите
    .old_failure = Возраст введен неверно, попробуйте еще раз
    .gender_confirm = Пожалуйста укажите пол который вы ищите
    .gender_success = Пол успешно добавлен !
    .gender_failure = Неверное значение, попробуйте еще раз

    .menu_text = Кого я ищу ?
    .menu_old = Возраст
    .menu_gender = Пол
    .menu_city = Город
search =
    .field_name = Имя
    .field_old = Возраст
    .field_city = Город
    .profile = <b>Имя</b>: {$name}
               <b>Возраст</b>: {$old}
    .noresult = ничего не найдено
    .empty_filters = не заполнены фильтры /filters
    .empty_profile = не заполнен профиль /profile