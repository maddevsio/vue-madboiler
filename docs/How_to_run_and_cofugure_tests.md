# How to run and configure tests

To test the widget we have a type of test:
1. [Functional](#unit-tests)
2. [Component](#integration-and-component-tests)
3. [Integration](#integration-and-component-tests)

## Run all tests with mock json server on production

Before running the tests, you need to run the `npm i` command to install all dependencies.

```bash
npm run tests
```

After running this command:

1. The Mock server will start
2. The unit test will start checking
3. Server for integration tests will start
4. Integration and component tests will start checking
5. Finish. A table of results will be displayed

```
(Run Finished)

       Spec                                              Tests  Passing  Failing  Pending  Skipped  
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  Home.spec.js                             00:05        5        5        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  Search.spec.js                           00:03        5        5        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  VehiclesList.spec.js                     642ms        1        1        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ✔  All specs passed!                        00:14       11       11        -        -        -
```

**IMPORTANT**: Tests should be run before the project build to warn of bugs. The `npm run build` command should be run if the tests pass.

Example:

```
npm i
npm run lint
npm run tests
npm run build
```

## Server for tests

A special Mock server for tests has been added so that the tests do not depend on a real server.

> We used this server > `https://github.com/typicode/json-server`

### Run server

> Original command to run server `json-server --watch ./tests/server/server.js`

```bash
npm run test:server
```

The server will start on the localhost and will be available at [http://localhost:8888](http://localhost:8888)

In the console you should see the following result:

```bash
$ npm run test:server

$ vms-showroom@0.0.1 test:server /home/denisoed/projects/XXX/vms-frontend
$ json-server --port 8888 --watch ./tests/server/server.js --routes ./tests/server/router.json --middlewares ./tests/server/middleware.js


\{^_^}/ hi!

Loading ./tests/server/server.js
Loading ./tests/server/router.json
Loading ./tests/server/middleware.js
Done

Resources
http://localhost:8888/cultures
http://localhost:8888/instance
http://localhost:8888/showroom
http://localhost:8888/vehicles
http://localhost:8888/vehicle
http://localhost:8888/bestDeals
http://localhost:8888/filtered
http://localhost:8888/availableFilters
http://localhost:8888/byIds

Other routes
/api/v1/CultureSections/json\?* -> /cultures
/api/v2/Instances/:id -> /instance
/api/v2/Showroom/public/:uid\?* -> /showroom
/api/v2/Showroom/public/:uid/AvailableFilters\?* -> /availableFilters
/api/v2/Showroom/public/:uid/vehicles/byIds\?* -> /byIds
/api/v2/Showroom/public/:uid/vehicles\?* -> /vehicles
/api/v2/Showroom/public/:uid/vehicles/best-deals\?* -> /bestDeals
/api/v2/Showroom/public/:uid/vehicles/filtered\?* -> /filtered
/api/v2/Showroom/public/:uid/vehicles/:uid\?* -> /vehicle

Home
http://localhost:8888

...
```

### Configure server

In the root of the project there is a configuration [file](./json-server.json) for json-server, in it you can change the port, add new middlewares, etc.

```json
{
  "port": "8888",
  "routes": "./tests/server/router.json",
  "middlewares": "./tests/server/middleware.js"
}
```

### Structure folders
 
The files for the server are located in the `/tests/server` folder.

* File [server.js](./tests/server/server.js) - is the main file for starting the server.
* File [router.json](./tests/server/router.json) - needed to create custom api urls.
* File [middleware.js](./tests/server/middleware.js) - needed to change the behavior of the json-server. Example change all POST requests to GET requests
* Folder **data** - stores files with test data, which will be returned by json-server. All data in the files can be changed.

## Unit tests

Functional testing allows you to test individual functions in your code to identify logical errors

> The jest library is used for unit tests > `https://vue-test-utils.vuejs.org/ru/guides`

Run unit tests

```bash
npm run test:unit
```

Generate code coverage report

```bash
npm run test:unit:coverage
```

## Integration and Component tests

The [cypress](https://www.cypress.io/) framework is used for integration and component testing. 

For the component tests we use experimental lib `https://docs.cypress.io/guides/component-testing/introduction.html#What-is-Cypress-Component-Testing`

Command for run:

```bash
npm run test:e2e
```

After running this command:

1. The Mock server will start
2. Server for integration tests will start
3. A window opens with a list of all tests that can be run and monitored.
![e2e window](./images/e2e-window.png)
4. Now you can start writing tests


### Folders and files

The integration tests are located in the `/tests/e2e` folder.

```bash
tests
  e2e
    components
      - example.spec.js
      - ...
    fixtures
      - example.json
      - ...
    integration
      - example.spec.js
      - ...
    plugins
        - index.js
    support
      - commands.js
      - index.js
    - constants.js
  unit
    - ...
  server
    - ...
```

* Add tests for components to the `/tests/e2e/components` folder
* Add tests for pages to the `/tests/e2e/integrations` folder
* *More information about folders and files can be found here* `https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Plugin-files`

> Please, use fixtures from this folder `/tests/server/data/*.js`. Example [VehiclesList](../tests/e2e/components/VehiclesList.spec.js)

### Settings

The settings file cypress.json for integration tests is located in the root of the project.

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

You can read about all available settings here `https://docs.cypress.io/guides/references/configuration.html#Options`

### Run tests in docker container

If you get this error

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

1. Please, run this command

```bash
xhost +si:localuser:root
```

Result

```bash
localuser:root being added to access control list
```

2. Run e2e tests
```bash
docker-compose -f docker-compose.e2e.yml -f cy-open.yml up --exit-code-from cypress
```
