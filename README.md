# Vue Mad Boiler(vue - 2.6.10)

При старте проекта на vue, постоянно сталкивался с тем, что приходилось снова и снова настраивать стор, добавлять базовую струкруту стилей, искать пакет иконок, настраивать нормально линтер и тд. Это отнимало достаточно времени.
Что уж говорить о человеке, который только начал копаться во всем в этом?! Там бывает и недели мало, чтобы собрать это всё.

Vue Mad Boiler - поможет избавить суеты, дав готовый, настроенный проект.

## Содержание

**[1. Запуск проекта](#запуск-проекта)**

  * [Через докер](#функционал-jwt-token)
  * [Без докера](#настройка-sentry)

**[2. Фичи](#фичи)**

  * [Функционал JWT Token](#функционал-jwt-token)
  * [Sentry](#sentry)
    * [Первым делом](#первым-делом)
    * [Параметры](#параметры)
  * [Gitlab pages](#gitlab-pages)
  * [Генерация ковредж баджей для юнит тестов](#генерация-ковредж-баджей-для-юнит-тестов)

**[3. Документирование компонентов](#документирование-компонентов)**

**[4. Тестирование проекта](#тестирование-проекта)**

**[5. Проверка, форматирование кода](#проверка,-форматирование-кода)**

  * [Линтер](#линтер)
  * [Форматирование кода](#форматирование-кода)

**[6. Запуск проекта на продакшне](#запуск-проекта-на-продакшне)**


## Запуск проекта

### Через докер

Этот вариант хорош тем, что не нужно устанавливать на вашу рабочую машину кучу npm зависимостей. Докер инкапсулирует весь этот мусор и не позволит загадить вашу систему.

Для этого вам потребуется установить только [Docker](https://docs.docker.com/get-docker/) и [Docker compose](https://docs.docker.com/compose/install/).

Запускаем проект для разработки

```bash
npm run docker:dev
```
После того как докер соберет контейнер, сайт будет доступен по ссылке http://localhost:8080

Настрой докера для разработки можно посмотреть в [Dockerfile.dev](./docker/Dockerfile.dev) и в [docker-compose.dev.yml](./docker-compose.dev.yml)

### Без докера

Если уж не хочется ставить докер, то запускаем без него.

1. Установим зависимости

```bash
npm i
```

2. Запускаем сервер

```bash
npm run serve
```

Если всё установилось и нормально запустилось, то в консоле будет такая картина

```bash
  DONE  Compiled successfully in 9320ms

  App running at:
  - Local:   http://localhost:8080/ 
  - Network: http://192.168.20.242:8080/

  Note that the development build is not optimized.
  To create a production build, run npm run build.
```

Там можно заметить две ссылки.

1. http://localhost:8080 - ссылка по которой будет доступен нащ сайт
2. http://192.168.20.242:8080 - по этой ссылке тоже будет доступен сайт, но так ей можно делиться внутри сети, например, для того, чтобы тестировать на телефоне или у друга на ноуте. Первая ссылка будет работать только на вашем ПК


## Фичи

* Пример настроенного стора, где применяется модульный подход
* Очень злой линтер. Поругает за стили, верстку и скрипты
* Само собой тесты, которые генерят отчет о покрытии кода
* Готовая структура папок. Не нужно ничего придумывать
* Очень крутой пакет Material иконок
* Vuetify - фрэимворк готовых ui элементов
* Базовая структура scss стилей
* Пример директивы, которая добавляет анимацию волны для кнопок
* Настройка мультиязычности.
* Привер сервиса для работы с localstorage
* Настройки роутера, + middleware

### Функционал JWT Token 

Для работы с JWT Token использован HTTP client axios (https://www.npmjs.com/package/axios).

Функционал реализован в файле /api/config.js

REFRESH_URL - эндпоинт по которому будет происходить запрос на обновление Access-token
RESPONSE_ACCESS_PARAM - название ключа по которому Access token будет сохраняться в local storage
RESPONSE_REFRESH_PARAM - название ключа по которому Refresh token будет сохраняться в local storage
DEFAULT_URL - Дефолтный URL по которому будет производиться запрос в случае если process.env.REACT_APP_API_URL будет пустой

Описание:
Access-token — это токен, который предоставляет доступ его владельцу к защищенным ресурсам сервера
Refresh-token — это токен, позволяющий клиентам запрашивать новые access-токены по истечении их времени жизни.

1. Клиент проходит аутентификацию в приложении
2. В случае успешной аутентификации сервер отправляет клиенту access- и refresh-токены, которые сохраняются в Local Storage по ключам RESPONSE_ACCESS_PARAM и RESPONSE_REFRESH_PARAM
3. При дальнейшем обращении к серверу клиент использует access-токен. Сервер проверяет токен на валидность и предоставляет клиенту доступ к ресурсам
4. В случае, если access-токен становится не валидным, клиент отправляет refresh-токен (по URL указанному в REFRESH_URL), в ответ на который сервер предоставляет два обновленных токена. (Которые обновляются в Local Storage)
5. В случае, если refresh-токен становится не валидным, то происходит удлания токенов из Local Storage и клиент опять должен пройти процесс аутентификации


Имеются методы:
1. queryGet - Используется для get запросов серверу, где первым параметром отправляется URL, вторым параметры запроса
queryGet('/some-url', {query: 1})

2. queryPost - Используется для post запросов серверу, где первым параметром отправляется URL, вторым данные передаваемые на сервер, третьим параметры запроса
queryPost = ('/some-url', {data: 'some_data'}, {query: 1})

Возможно добавление собственных запросов, либо создать новый instance axios.create.

### Sentry

Sentry - сервис для удаленного мониторинга ошибок в веб приложениях.

#### Первым делом

1. Идём на сайт https://sentry.io и авторизуемся
2. Создаём новый проект https://docs.sentry.io/product/sentry-basics/guides/integrate-frontend/create-new-project/
3. После этого шага, у вас в распоряжении окажется dns url, который добавим в настройках в файле [main.js](./src/main.js)
4. Перезапускаем проект. По идеи все настроено и готово к отлову ошибок.  

#### Параметры

* dns - урл на который будут отправляться ошибки. Его получите при создании нового проекта в Sentry 
* tracesSampleRate - количество отправляемых ошибок в процентном соотношении от 0 до 1. Если нужно отправлять 40% транзакций - укажите 0.4

### Gitlab pages

В начале разработки проекта, было бы хорошо иметь сервер, на котором бы крутился ваш сайт. чтобы иметь возможность демонстрировать его заказчику или еще кому-то.

Конечно, есть куча разных вариантов, но мы остановились на Giblab pages.

https://madboiler.gitlab.io/frontend/vue-madboiler/

В файле [vue.config.js](./vue.config.js) добавили функцию, которая определяет правильный путь к файлов в gitlab. Но вам нужно обязательно переписать его под свой проект, так как пути могут быть разные.

Ну или использовать другой вариант для зостинка вашего проекта.

Чтобы это все завелось на gitlab, был добавлен файл [.gitlab-ci.yml](./.gitlab-ci.yml). В нём можно найти блок кода, который отвечает за разветрывание страницы

```bash
pages:
  image: node:14.15.4
  stage: deploy
  script:
    - npm run build
    - mv public public-vue # GitLab Pages hooks on the public folder
    - mv dist public # rename the dist folder (result of npm run build)
    # optionally, you can activate gzip support with the following line:
    - find public -type f -regex '.*\.\(htm\|html\|txt\|text\|js\|css\)$' -exec gzip -f -k {} \;
  artifacts:
    paths:
      - public # artifact path must be /public for GitLab Pages to pick it up
  only:
    - master
```

Последняя строчка кода, говорит о том, что страница будет обновлена только в том случае, если изменения будет залиты в ветку master.

### Генерация ковредж баджей для юнит тестов

Понимать какой процент кода покрыт тестами всегда хорошо. Это как минимум показывает нам на сколько проект стабилен.

Чтобы выдеть это наглядно без особо труда, был добален скрипт для генерации баджей, который отображают процент покрытия кода.

![Coverage statements](public/badge-statements.svg) 
![Coverage branches](public/badge-branches.svg)
![Coverage functions](public/badge-functions.svg)
![Coverage lines](public/badge-lines.svg)

Команда для генерации баджей

```bash
node ./jest-coverage-badges.js -output './public'
```

Но нужно понимать, что для генерации баджей нужно обязательно запустить команду, которая создаст папку `coverage` с нужными файлами.

Для этого в файле [package.json](./package.json) добавили скрипт, который запускает и то и другой

```bash
npm run test:unit:coverage
```

После запуска команды, баджи будет лежать в папке `public`.

## Документирование компонентов

Проект с хорошо задокументированным кодом, в дальнейшем обеспечит более низкий порог входа для новых разработчиков. Вот пример доки для [vuetify button](https://vuetifyjs.com/en/api/v-btn/)

[@vuedoc/md](https://www.npmjs.com/package/@vuedoc/md) библиотека, которую будем использовать для документирования компонентов.

Чтобы можно было вызвать команду `vuedoc.md`, нужно обязательно установить этот пакет глобально.

Возможно понадобится использовать команду `sudo`, чтобы дать права на установку пакета глобально. 

```bash
sudo npm install --global @vuedoc/parser @vuedoc/md
```

Теперь, мы можем документировать компоненты.

Вот несколько примеров https://gitlab.com/vuedoc/md/-/tree/master/test/fixtures

После того, как описали один и компонентов, можно запускать команду и смореть результат. Только не забудьте поправить команду под вашу структуру файлов и папок.

```bash
vuedoc.md src/components/COMPONENT_NAME.vue --output docs/components
```
