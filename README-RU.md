# Vue Mad Boiler(vue - 2.6.10)

![Preview](./public/preview.png)

При старте проекта на vue, постоянно сталкивался с тем, что приходилось снова и снова настраивать стор, добавлять базовую структуру стилей, искать пакет иконок, настраивать нормально линтер и тд. Это отнимало достаточно времени.
Что уж говорить о человеке, который только начал копаться во всем в этом?! Там бывает и недели мало, чтобы собрать это всё.

Vue Mad Boiler - поможет избавить вас от суеты, дав готовый, настроенный проект.

## Содержание

**[1. Запуск проекта](#запуск-проекта)**

  * [Через докер](#через-докер)
  * [Без докера](#без-докера)

**[2. Фичи](#фичи)**

  * [Функционал JWT Token](#функционал-jwt-token)
  * [Sentry](#sentry)
    * [Первым делом](#первым-делом)
    * [Параметры](#параметры)
  * [Gitlab pages](#gitlab-pages)
  * [Генерация ковредж баджей для юнит тестов](#генерация-ковредж-баджей-для-юнит-тестов)

**[3. Документирование компонентов](#документирование-компонентов)**

  * [Установка vuedoc](#установка-vuedoc)

**[4. Тестирование проекта](#тестирование-проекта)**
  
  * [Mock server](#mock-server)
    * [Структура папок](#структура-папок)
    * [Запуск сервера](#запуск-сервера)
  * [Unit тесты](#unit-тесты)
  * [Интеграционные и Компонентные тесты](#интеграционные-и-компонентные-тесты)
    * [Папки и файлы](#папки-и-файлы)
    * [Настройка](#настройка)
    * [Запуск тестов в докер контейнере](#запуск-тестов-в-докер-контейнере)

**[5. Проверка, форматирование кода](#проверка,-форматирование-кода)**

  * [Линтер](#линтер)
  * [Форматирование кода](#форматирование-кода)

**[6. Запуск проекта на продакшне](#запуск-проекта-на-продакшне)**


## Запуск проекта

### Через докер

Этот вариант хорош тем, что не нужно устанавливать на вашу рабочую машину кучу npm зависимостей. Докер инкапсулирует весь этот мусор и не позволит загадить вашу систему.

Для этого потребуется установить только [Docker](https://docs.docker.com/get-docker/) и [Docker compose](https://docs.docker.com/compose/install/).

Запускаем проект для разработки

```bash
npm run docker:dev
```
После того как докер соберет контейнер, сайт будет доступен по ссылке http://localhost:8080

Настройки докера для разработки можно посмотреть в [Dockerfile.dev](./docker/Dockerfile.dev) и в [docker-compose.dev.yml](./docker-compose.dev.yml)

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

Там можно заметить две ссылки:

1. http://localhost:8080 - ссылка по которой будет доступен наш сайт
2. http://192.168.20.242:8080 - по этой ссылке тоже будет доступен сайт, но так им можно делиться внутри сети(под одним wifi), например, для того, чтобы тестировать на телефоне или у друга на ноуте. Первая же ссылка будет работать только на вашем ПК


## Фичи

* Пример настроенного стора, где применяется модульный подход
* Очень злой линтер. Поругает за стили, верстку и скрипты
* Само собой тесты, которые генерят отчет о покрытии кода
* Готовая структура папок. Не нужно ничего придумывать
* Очень крутой пакет Material иконок
* Vuetify - фреймворк готовых ui элементов
* Базовая структура scss стилей
* Пример директивы, которая добавляет анимацию волны для кнопок
* Настройка мультиязычности.
* Привер сервиса для работы с localstorage
* Настройки роутера, + middleware
* Функционал JWT Token

### Функционал JWT Token 

Для работы с JWT Token использован HTTP client axios (https://www.npmjs.com/package/axios).

Функционал реализован в файле /api/config.js

**REFRESH_URL** - эндпоинт по которому будет происходить запрос на обновление Access-token
**RESPONSE_ACCESS_PARAM** - название ключа по которому Access token будет сохраняться в local storage
**RESPONSE_REFRESH_PARAM** - название ключа по которому Refresh token будет сохраняться в local storage
**DEFAULT_URL** - Дефолтный URL по которому будет производиться запрос в случае если process.env.REACT_APP_API_URL будет пустой

#### Описание:

**Access-token** — это токен, который предоставляет доступ его владельцу к защищенным ресурсам сервера
**Refresh-token** — это токен, позволяющий клиентам запрашивать новые access-токены по истечении их времени жизни.

1. Клиент проходит аутентификацию в приложении
2. В случае успешной аутентификации сервер отправляет клиенту access- и refresh-токены, которые сохраняются в Local Storage по ключам RESPONSE_ACCESS_PARAM и RESPONSE_REFRESH_PARAM
3. При дальнейшем обращении к серверу клиент использует access-токен. Сервер проверяет токен на валидность и предоставляет клиенту доступ к ресурсам
4. В случае, если access-токен становится не валидным, клиент отправляет refresh-токен (по URL указанному в REFRESH_URL), в ответ на который сервер предоставляет два обновленных токена. (Которые обновляются в Local Storage)
5. В случае, если refresh-токен становится не валидным, то происходит удаление токенов из Local Storage и клиент опять должен пройти процесс аутентификации


#### Имеются методы:
1. **queryGet** - Используется для get запросов к серверу, где первым параметром отправляется URL, вторым параметры запроса

```bash
queryGet('/some-url', {query: 1})
```

2. **queryPost** - Используется для post запросов к серверу, где первым параметром отправляется URL, вторым данные передаваемые на сервер, третьим параметры запроса

```bash
queryPost = ('/some-url', {data: 'some_data'}, {query: 1})
```

Возможно добавление собственных запросов, либо создать новый instance axios.create.

### Sentry

Sentry - сервис для удаленного мониторинга ошибок в веб приложениях.

#### Первым делом

1. Идём на сайт https://sentry.io и авторизуемся
2. Создаём новый проект https://docs.sentry.io/product/sentry-basics/guides/integrate-frontend/create-new-project/
3. После этого шага, у вас в распоряжении окажется `dns url`, который добавим в настройках в файле [main.js](./src/main.js)
4. Перезапускаем проект. По идеи все настроено и готово к отлову ошибок.  

#### Параметры

* **dns** - урл на который будут отправляться ошибки. Его получите при создании нового проекта в Sentry 
* **tracesSampleRate** - количество отправляемых ошибок в процентном соотношении от 0 до 1. Если нужно отправлять 40% транзакций - укажите 0.4

### Gitlab pages

В начале разработки проекта, было бы хорошо иметь сервер, на котором бы крутился ваш сайт. чтобы иметь возможность демонстрировать его заказчику или еще кому-то.

Конечно, есть куча разных вариантов, но мы остановились на Giblab pages.

https://madboiler.gitlab.io/frontend/vue-madboiler/

В файле [vue.config.js](./vue.config.js) добавили функцию, которая определяет правильный путь к файлам в gitlab. Но вам нужно обязательно переписать его под свой проект, так как пути могут быть разные.

Ну или использовать другой вариант для хостинка вашего проекта.

Чтобы это всё завелось на gitlab, был добавлен файл [.gitlab-ci.yml](./.gitlab-ci.yml). В нём можно найти блок кода, который отвечает за разветрывание страницы

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

Понимать какой процент кода покрыт тестами всегда хорошо. Это как минимум показывает на сколько проект стабилен.

Чтобы выдеть это наглядно и без особо труда, был добален скрипт для генерации баджей, который отображают процент покрытия.

![Coverage statements](public/badge-statements.svg) 
![Coverage branches](public/badge-branches.svg)
![Coverage functions](public/badge-functions.svg)
![Coverage lines](public/badge-lines.svg)

Команда для генерации баджей

```bash
node ./jest-coverage-badges.js -output './public'
```

Но нужно понимать, что для генерации баджей нужно обязательно запустить команду, которая создаст папку `coverage` с нужными файлами.

Для этого в файле [package.json](./package.json) добавили скрипт, который запускает и то и другое

```bash
npm run test:unit:coverage
```

После запуска команды, баджи будет лежать в папке `public`.

## Документирование компонентов

Проект с хорошо задокументированным кодом, в дальнейшем обеспечит более низкий порог входа для новых разработчиков.

[@vuedoc/md](https://www.npmjs.com/package/@vuedoc/md) библиотека, которую будем использовать для документирования компонентов.

Вот пример доки для [vuetify button](https://vuetifyjs.com/en/api/v-btn/)

### Установка vuedoc

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

## Тестирование проекта

В проекте доступно три вида тестов

1. **Unit** - ими будут тестироваться конкретные функции в коде, чтобы понимать, что они работают так, как ожидается
2. **Component** - тестирование отдельных компонентов, например, дропдаун. Можно проверить, что при нажатии на него выпадает список или при нажатии на элемент списка он выделяется и тд
3. **Integration** - этими тестами уже проверяется вся связка, то как оно работает вместе.

### Mock server

Чтобы тесты не зависели от реального сервера, который может отказать в любую секунду, был добавлен mock server, с возможностью подмены запросов.
Таким образом мы сможет тестровать проект даже без доступа в интернет.

> В этом нас поможет > `https://github.com/typicode/json-server`

#### Структура папок
 
Файлы для сервера находятся в папке `/tests/server`.

* Файл [server.js](./tests/server/server.js) - это основной файл для запуска сервера.
* Файл [config.js](./tests/server/config.js) - файл с опциями для сервера.
* Папка **data** - хранит файлы с тестовыми данными, которые будут возвращены json-сервером. Все данные в файлах могут быть изменены.

#### Запуск сервера

> Оригинальная команда для запуска `json-server --watch ./tests/server/server.js`

```bash
npm run test:server
```

Сервер запустится на локальном хосте и будет доступен по адресу [http://localhost:8888](http://localhost:8888).

В консоли должен быть виден следующий результат:

```bash
$ npm run test:server

> vue-madboiler@1.0.0 test:server
> node ./tests/server/server.js

JSON Server is running on port: 8888
...
```

### Unit тесты

Для запуска unit тестов используется [vue-cli-service](https://cli.vuejs.org/guide/cli-service.html), который уже полностью настроен и готов к работе.

Имеем две команды

1. Запуск тестов.

```bash
npm run test:unit
```

Тесты располагаются в папке `/tests/unit`.


2. Генерация отчета о покрытии кода тестами

```bash
npm run test:unit:coverage
```

После запуска команды, в корне проекта создастся папка `/coverage`, в которой будет лежать отчет. При этот будут сгенерированны баджи, о которых можно почитать [тут](#генерация-ковредж-баджей-для-юнит-тестов)

Чтобы посмотреть отчёт, перейдем в папку `/coverage/lcov-report` и найдем там файл [index.html](./coverage/lcov-report/index.html). Этот файл нужно запустить в баузере. Откроется страница с подробной инфой о покрытии кода тестами.

### Интеграционные и Компонентные тесты

Для данного вида тестов используем фреймворк [cypress](https://www.cypress.io/). 

Для тестирования конкретных компонентов используем экспериментальную библиотеку `https://docs.cypress.io/guides/component-testing/introduction.html#What-is-Cypress-Component-Testing`.

Команда для запуска:

```bash
npm run test:e2e
```

После выполнения этой команды:

1. Запустится mock server
2. Запустится сервер для интеграционных и компонентных тестов
3. Открывается окно со списком всех тестов, которые можно запустить и видить процесс.
4. Далее можно приступать к написанию тестов.

#### Папки и файлы

Интеграционные и Компонентные тесты находятся в папке `/tests/e2e`.

```bash
tests
  e2e
    components
      - UIButton.spec.js
      - ...
    fixtures
      - example.json
      - ...
    integrations
      - Home.spec.js
      - ...
    plugins
        - index.js
    support
      - commands.js
      - index.js
  unit
    - ...
  server
    - ...
```

* `/tests/e2e/components` - эта папка предназначена для компонентных тестов.
* `/tests/e2e/integrations` - эта для интеграционных.
* Больше информации о папках и файлах можно найти здесь `https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Plugin-files`.

#### Настройка

Файл настроек cypress.json находится в корне проекта.

```bash
{
  "baseUrl": "http://localhost:3000",
  "chromeWebSecurity": false,
  "pluginsFile": "tests/e2e/plugins/index.js",
  "supportFile": "tests/e2e/support/index.js",
  "fixturesFolder": "tests/e2e/fixtures",
  "integrationFolder": "tests/e2e/integrations",
  "testFiles": "**/*.spec.js*",
  "experimentalComponentTesting": true,
  "componentFolder": "tests/e2e/components",
  "nodeVersion":"system",
  "video": false,
  "viewportWidth": 1366,
  "viewportHeight": 768
}
```

Обо всех доступных настройках можно прочитать здесь `https://docs.cypress.io/guides/references/configuration.html#Options`.

#### Запуск тестов в докер контейнере

```bash
npm run docker:test:e2e
```

Если получаем такую ошибку, то

```bash
cypress_1  | ----------
cypress_1  | 
cypress_1  | No protocol specified
cypress_1  | [101:0208/050449.746174:ERROR:browser_main_loop.cc(1434)] Unable to open X display.
cypress_1  | The futex facility returned an unexpected error code.
cypress_1  | No protocol specified
cypress_1  | [115:0208/050450.882329:ERROR:browser_main_loop.cc(1434)] Unable to open X display.
cypress_1  | 
cypress_1  | undefined:0
cypress_1  | 
cypress_1  | 
cypress_1  | illegal access
cypress_1  | (Use `Cypress --trace-uncaught ...` to show where the exception was thrown)
cypress_1  | 
cypress_1  | ----------
```

1. В консоле запустим эту команду

```bash
xhost +si:localuser:root
```

Результат должен быть таким

```bash
localuser:root being added to access control list
```

2. По идеи дальше всё дожно запустить

```bash
npm run docker:test:e2e
```

## Проверка, форматирование кода

### Линтер

Для того, чтобы проект был всегда всегда написан так сказать "одним почерком", в проекте необходимо использовать линтер.
Это позволит сделать код единообразным, удобным для восприятия вам и другим разработчиками.

В качестве линтера используется [eslint](https://eslint.org/) в пресетом [airbnb](https://github.com/airbnb/javascript).

Команда ниже, запустит проверку `.vue, .js, .scss` файлов. Так же во `.vue` файлах будет проверен блок `<style></style>`.

```bash
npm run lint
```

Настройки для `.vue, .js` файлов можно посмотреть в [.eslintrc.js](./.eslintrc.js)
Настройки для `.scss` файлов в [.sass-lint.yml](./.sass-lint.yml)

### Форматирование кода

Не всегда получается писать код аккуратно и так как требует линтер. Чтобы упростить себе жизнь, в проект был добавлен [Prettier](https://prettier.io/)

Он поможет автоматически поправить код, максимально привести его к той форме, которую требует линтер

```bash
npm run format
```

Настройки можно посмотреть тут [.prettierrc](./.prettierrc)

## Запуск проекта на продакшне

После того, как проект готов к продакшену его нужно правильно собрать.

Для этого подготовили докер команду

```bash
npm run docker:prod
```

После запуска, докер сбилдит файлы, запустит nginx, который будет проксировать наш index.html

Страница будет доступна по ссылке http://localhost/