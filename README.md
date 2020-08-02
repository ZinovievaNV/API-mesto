#  *API Mesto*

версия: *v0.0.4*

*Проект выполнен в рамках обучения в **Яндекс.Практикуме***.

#### Было реализовано:

- В ответ на запрос **GET** localhost:3000/users сервер возвращает всех пользователей из базы данных .

- В ответ на запрос **GET** localhost:3000/cards сервер возвращает все карточки из базы данных.

- В ответ на запрос **GET** localhost:3000/users/:id, сервер возвращает конкретного пользователя (по id), если пользователя с запрошенным идентификатором нет, API вернет **404** статус ответа и ошибку. 

- Запрос **POST** localhost:3000/signup создаёт пользователя, указав 3 параметра(name,about,avatar)

- Запрос **POST** /cards создаёт карточку, указав 2 параметра(name, link).

- Запрос **DELETE** localhost:3000/cards/:cardId — удаляет карточку по идентификатору.

- Роуты /signin и /signup при запросе проходят валидацию.

- При правильном JWT авторизационный мидлвэр добавляет в объект запроса пейлоуд и пропускает запрос дальше

- Добавлена валидация ссылок на avatar пользователя и link карточек.

- Добавлена проверка url адреса картинки и уникальность email при создании нового пользователя.

- Реалезованно логгирование запросов и ошибок.

- Добавлена централизованная обработка ошибок.

##### Для запуска на сервере (localhost:3000) необходимо использовать команду "npm run start".Подключенный к базе данных Mongo.

- API развернут по адресу https://api.mestoyp.tk/(бэкэнд) , www.mestoyp.tk(фронтэнд) (публичный IP 84.201.168.23)
