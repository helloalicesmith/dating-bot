common =
    .keyboard_search = Искать! 🥰
    .keyboard_gender_male = Мужской
    .keyboard_gender_female = Женский
    .error = Что-то пошло не так. Повторите попытку
    .cancel = Отмена
    .cancel_confirm = Действие отменено
    .done = Готово
start =
    .hello = Привет! Прежде чем начать, заполни свой профиль 🤓
    .hello_again = С возвращением, <b>{$name}</b>! 🤟 
profile =
    .menu_settings = Изменить данные профиля
    .menu_settings_photo = Изменить фото профиля
    .menu_settings_name = Имя
    .menu_settings_confirm = Пожалуйста, введите свое имя
    .menu_settings_old = Возраст
    .menu_settings_old_confirm = Пожалуйста, введите ваш возраст
    .menu_settings_gender = Пол
    .menu_settings_gender_confirm = Пожалуйста, введите ваш пол
    .menu_settings_city = Добавить город
    .menu_settings_city_confirm = Пожалуйста, добавьте геолокацию
    .menu_settings_photo_confirm = Пожалуйста, добавьте фотографию
    .menu_settings_description = Описание
    .menu_settings_description_confirm = Пожалуйста, добавьте описание
    .menu_settings_description_success = Описание успешно добавлено
    .menu_settings_description_failure = Описание слишком большое. Пожалуйста, отредактируйте описание так, чтобы количество символов не превышало 200
    .menu_settings_photo_info =
        { NUMBER($images, type: "ordinal") ->
            [0] У вас нет фотографий. Отправьте фото, чтобы можно было пользоваться ботом
            [1] У вас одна фотография. Отправьте новую фотографию или удалите существующую
            [2] У вас 2 фотографии. Отправьте новую фотографию или удалите существующую
            [3] У вас 3 фотографии. Вы можете только удалить существующие фото, после чего отправить новые
            *[other] test
        }

    .print_gender_male = Мужчина
    .print_gender_female = Женщина
    .print_profile = <b>Ваш профиль 📋</b>
                     <b>Имя</b>: {$name}
                     <b>Возраст</b>: {$old}
                     <b>Пол</b>: {$gender}
                     <b>Город</b>: {$city}
                     <b>Количество фото</b>: {$imagesCount} из 3
                     <b>Описание</b>: {$description}
                     
                     📌 Для того, чтобы пользоваться ботом, убедитесь в том, что вы указали <b>все</b> данные. И добавили хотя бы <b>1</b> фото
    .print_nullvalue = Ничего нет 😧
    .name_success = Ваше имя успешно обновлено, <b>{$name}</b>!
    .name_failure = Значение имени неверное, попробуйте еще раз
    .gender_success = Пол успешно добавлен!
    .gender_failure = Неверное значение, попробуйте еще раз
    .old_success = Ваш возраст успешно обновлен!
    .old_failure = Возраст введен неверно, попробуйте еще раз
    .location_success = Геолокация успешно добавлена!
    .location_failure = Не похоже на геолокацию, повторите попытку

    .photo_add_success = Фото успешно добавлено!
    .photo_add_failure = Ошибка добавления фото, повторите попытку или отмените операцию
    .photo_delete_success = Фото успешно удалено!
    .photo_length_failure = У вас максимальное количество фотографий
    .photo_settings_cancel = Настройка фото завершена!
    
    .keyboard_location = Отправить геолокацию
    .keyboard_photo_add = Добавить фото
    .keyboard_photo_delete = Удалить {$imagesCount} фото
filters =
    .add_success = Фильтр успешно добавлен!
    .old_confirm = Пожалуйста, укажите возраст, который вы ищите
    .old_failure = Возраст введен неверно, попробуйте еще раз
    .gender_confirm = Пожалуйста, укажите пол, который вы ищите
    .gender_success = Пол успешно добавлен!
    .gender_failure = Неверное значение, попробуйте еще раз
    .city_confirm = Поиск будет осуществляться по вашему указанному городу

    .menu_text = Кого я ищу?
    .menu_old = Возраст
    .menu_gender = Пол
    .menu_city = Город
search =
    .field_name = Имя
    .field_old = Возраст
    .field_city = Город
    .profile = <b>Имя</b>: {$name}
               <b>Возраст</b>: {$old}
    .noresult = Ничего не найдено
    .empty_filters = Не заполнены фильтры /filters
    .empty_profile = Не заполнен профиль /profile
