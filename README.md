# Vue Mad Boiler(vue - 2.6.10)

When starting a project in vue, I was constantly faced with the fact that I had to set up the store again and again, add the basic structure of styles, look for a package of icons, configure the linter properly, etc. This was quite time consuming.
What to say about the person who just started digging into it all! A week isn't even long enough to put it all together.

Vue Mad Boiler can take the hassle out of it by giving you a ready-made, set-up project.

## Contents

**[1. Run project](#run-project)**

  * [With docker](#with-docker)
  * [Without docker](#without-docker)

**[2. Features](#features)**

  * [JWT functional](#jwt-functional)
  * [Sentry](#sentry)
    * [Init](#init)
    * [Params](#params)
  * [Gitlab pages](#gitlab-pages)
  * [Generate coverage badges for unit tests](#generate-coverage-badges-for0unit-tests)

**[3. Component documentation](#component-documentation)**

**[4. Project testing](#зroject-testing)**
  
  * [Mock server](#mock-server)
    * [Folder structure](#folder-structure)
    * [Run server](#run-server)
  * [Unit tests](#unit-tests)
  * [Integration and component tests](#integration-and-component-tests)
    * [Folders and files](#folders-and-files)
    * [Settings](#settings)
    * [Run tests in docker container](#run-tests-in-docker-container)

**[5. Checking, formatting code](#checking,-formatting-code)**

  * [Linter](#linter)
  * [Formatting code](#formatting-code)

**[6. Run project on production](#run-project-on-production)**


## Run project

### With docker

The good thing about this option is that you don't need to install a bunch of npm dependencies on your working machine. The docker encapsulates all this garbage and prevents your system from getting clobbered.

You only need to install [Docker](https://docs.docker.com/get-docker/) and [Docker compose](https://docs.docker.com/compose/install/).

Run a project for development

```bash
npm run docker:dev
```
After docker builds the container, the site will be available at http://localhost:8080

You can see the docker setup for development in [dockerfile.dev](./docker/Dockerfile.dev) and in [docker-compose.dev.yml](./docker-compose.dev.yml)

### Without docker

If you don't want to install the docker, you can run it without it.

1. Install Dependencies

```bash
npm i
```

2. Run server

```bash
npm run serve
```

If everything is installed and started correctly, the console will show the result

```bash
  DONE  Compiled successfully in 9320ms

  App running at:
  - Local:   http://localhost:8080/ 
  - Network: http://192.168.20.242:8080/

  Note that the development build is not optimized.
  To create a production build, run npm run build.
```

You can spot two references there

1. http://localhost:8080 - the link where our site will be available
2. http://192.168.20.242:8080 - on this link will also be available on the site, but so it can be shared internally, for example, to test on your phone or at a friend's laptop. The first link will only work on your PC


## Features

* An example of a customized store where the modular approach is applied
* A very angry linter. Scolds you for styles, layout and scripts.
* Tests that generate a code coverage report
* Ready-made folder structure. You don't have to make anything up.
* Very cool Material icon pack *
* Vuetify is a framework of ready-made ui elements
* Basic scss style structure
* Example directive that adds wave animation for buttons
* Multilanguage customization.
* A service primer to work with localstorage
* Router settings, + middleware

### JWT functional

To work with JWT Token, HTTP client axios (https://www.npmjs.com/package/axios) is used.

The functionality is implemented in the file src/api/config.js

REFRESH_URL - endpoint on which the request to update the access-token will be made
RESPONSE_ACCESS_PARAM - name of the key by which the access-token will be saved in the local storage
RESPONSE_REFRESH_PARAM - the name of the key by which the Refresh token will be saved in the local storage
DEFAULT_URL - Default URL for the request in case process.env.REACT_APP_API_URL will be empty

**Description:**

An access-token is a token that gives its owner access to secure server resources
Refresh-token is a token that allows clients to request new access-tokens when their lifetime expires.

1. The client is authenticated in the application
2. If authentication is successful, server sends access and refresh tokens to client, which are stored in Local Storage by RESPONSE_ACCESS_PARAM and RESPONSE_REFRESH_PARAM keys
3. The client uses the access token to further access the server. Server checks token for validity and gives client access to resources
4. In case the access token becomes invalid, the client sends a refresh token (at the URL specified in REFRESH_URL), in response to which the server provides two updated tokens. (Which are updated in Local Storage).
5. If the refresh token expired, the tokens are removed from Local Storage and the client has to authenticate again


**There are methods:**

1. queryGet - Used to get requests to the server, where the first parameter is the URL, the second request parameters

```bash
queryGet('/some-url', {query: 1})
```

2. queryPost - used for request post to the server, where the first parameter is a URL, the second one is data transferred to the server, the third one are query parameters

```bash
queryPost = ('/some-url', {data: 'some_data'}, {query: 1})
```

It's possible to add your own queries or create a new instance axios.create.

### Sentry

Sentry is a service for remote error monitoring in web applications.

#### Init

1. Go to https://sentry.io and log in there
2. Create a new project https://docs.sentry.io/product/sentry-basics/guides/integrate-frontend/create-new-project/
3. After this step, you will have a dns url, which will be added to the settings in the file [main.js](./src/main.js)
4. Restart the project. Everything is set up and ready to catch errors. 

#### Params

* **dns** - the url to which errors will be sent. You will get it when creating a new project in Sentry 
* **tracesSampleRate** - number of sent errors as a percentage from 0 to 1. If you need to send 40% of transactions - specify 0.4
### Gitlab pages

At the beginning of the project development, it would be good to have a server to run your site on, to be able to show it to the customer or someone else.

Of course, there are a bunch of different options, but we settled on Giblab pages.

https://madboiler.gitlab.io/frontend/vue-madboiler/

In the file [vue.config.js](./vue.config.js) added a function that determines the correct path to the files in gitlab. But you need to make sure to rewrite it for your project, because paths can be different.

Well, or use another option for hosting your project.

To make it all work on gitlab, the file [.gitlab-ci.yml](./.gitlab-ci.yml) was added. Here you can find a block of code that is responsible for deploying the page

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

The last line of code, says that the page will be updated only if changes are sent to the master branch.

### Generate coverage badges for unit tests

Understanding what percentage of the code is covered by tests is always good. This at least shows us how stable the project is.

To see this visually, a script has been added to generate badges that display the percentage of code coverage.

![Coverage statements](public/badge-statements.svg) 
![Coverage branches](public/badge-branches.svg)
![Coverage functions](public/badge-functions.svg)
![Coverage lines](public/badge-lines.svg)

Command for generating badges

```bash
node ./jest-coverage-badges.js -output './public'
```

But it should be understood that in order to generate badges it is necessary to run a command that creates a folder `coverage` with the necessary files.

To do this, we added a script in the [package.json](./package.json) file that runs both

```bash
npm run test:unit:coverage
```

After running the command, the badge will lie in the `public` folder.

## Component documentation

A project with well-documented code, in the future, will provide a lower entry threshold for new developers.

[@vuedoc/md](https://www.npmjs.com/package/@vuedoc/md) the library we will use to document components.

Here is a sample doc for [vuetify button](https://vuetifyjs.com/en/api/v-btn/)

To be able to call the `vuedoc.md` command, it must be install globally.

You may need to use the `sudo` command to give global permissions to install the package.

```bash
sudo npm install --global @vuedoc/parser @vuedoc/md
```

Now, we can document the components.

Here are a few examples https://gitlab.com/vuedoc/md/-/tree/master/test/fixtures

After you have described one and components, you can run the command and see the result. Just don't forget to adjust the command to your file and folder structure.

```bash
vuedoc.md src/components/COMPONENT_NAME.vue --output docs/components
```

## Project testing

There are three types of tests available in the project

1. **Unit** - they will test specific functions in the code to understand that they work as expected
2. **Component** - testing individual components. For example, dropdown. You may verify that when you click on it, the list will drop down, when you click on a list item it will be highlighted, etc.
3. **Integration** - these tests already test the whole bundle, how it works together.

### Mock server

In order to avoid dependence on the real server, which can fail at any second, we added a mock server, with the possibility of spoofing requests.
This way we can test the project even without internet access.

> For this we will use > `https://github.com/typicode/json-server`

#### Folder structure
 
The files for the server are in the `/tests/server` folder.

* File [server.js](./tests/server/server.js) is the main file for starting the server.
* File [config.js](./tests/server/config.js) - file with options for server.
* **data** folder - stores files with test data, which will be returned by the json server. All data in the files can be changed.

#### Run server

> Original command to run `json-server --watch ./tests/server/server.js`

```bash
npm run test:server
```

The server will start on the local host and will be available at [http://localhost:8888](http://localhost:8888).

You should see the following result in the console:

```bash
$ npm run test:server

> vue-madboiler@1.0.0 test:server
> node ./tests/server/server.js

JSON Server is running on port: 8888
...
```

### Unit tests

To run these tests, use [vue-cli-service](https://cli.vuejs.org/guide/cli-service.html), which is already fully configured and ready to go.

We have two commands

1. Running tests.

```bash
npm run test:unit
```

The tests are located in the `/tests/unit` folder.


2. Generating a report on code coverage by tests

```bash
npm run test:unit:coverage
```

After running the command, a folder `/coverage` will be created in the root of the project, where the report will be located. This will generate badges, which you can read about [here](#generation-covreage-badges-for-unit-tests)

To see the report, go to the folder `/coverage/lcov-report` and find the file [index.html](./coverage/lcov-report/index.html) there. This file must be run in the browser. This will open a page with detailed information about code coverage by tests.

### Integration and component tests

For this kind of tests we use the [cypress](https://www.cypress.io/) framework.

To test specific components, we use the experimental library `https://docs.cypress.io/guides/component-testing/introduction.html#What-is-Cypress-Component-Testing`.

The command to start:

```bash
npm run test:e2e
```

After executing this command:

1. The mock server will start
2. The server for integration and component tests starts
3. Opens a window with a list of all the tests that you can run and see the process.
4. Then you can start writing tests.

#### Folders and files

Integration and Component tests are located in the `/tests/e2e` folder.

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

* `/tests/e2e/components` - this folder is for component tests.
* `/tests/e2e/integrations` - this is for integration tests.
* More information about folders and files can be found here `https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Plugin-files`.

#### Settings

The settings file cypress.json is in the root of the project.

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

You can read about all the available settings here `https://docs.cypress.io/guides/references/configuration.html#Options`.

#### Run tests in docker container

```bash
npm run docker:test:e2e
```

If we get such an error, then

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

1. In the console run this command

```bash
xhost +si:localuser:root
```

The result should be

```bash
localuser:root being added to access control list
```

2. Everything should now run

```bash
npm run docker:test:e2e
```

## Checking, formatting code

### Linter

In order to ensure that the project is always written in "one handwriting" so to speak, it is necessary to use a linter in the project.
This will make the code uniform and easy to understand for you and other developers.

The linter is [eslint](https://eslint.org/) with the preset [airbnb](https://github.com/airbnb/javascript).

The command below, will check the `.vue, .js, .scss` files. Also in the `.vue` files will be checked the block `<style></style>`.

```bash
npm run lint
```

Settings for `.vue, .js' files can be found in [.eslintrc.js](./.eslintrc.js)
Settings for `.scss` files in [.sass-lint.yml](./.sass-lint.yml)

### Formatting code

It's not always possible to write code neatly and the way the linter requires. To make life easier, [Prettier](https://prettier.io/) was added to the project

It helps to automatically correct the code, to bring it as close as possible to the form required by the linter

```bash
npm run format
```

You can see the settings here [.prettierrc](./.prettierrc)

## Run project on production

Once the project is ready for production it must be properly assembled.

For this purpose, a docker command was prepared.

```bash
npm run docker:prod
```

После запуска, докер сбилдит файлы, запустит nginx, который будет проксировать наш index.html

The page will be available at http://localhost/
