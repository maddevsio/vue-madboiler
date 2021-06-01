function cypress(remove, key) {
  if (remove) return null;
  switch (key) {
    case 'scripts':
      return {
        "docker:test:e2e": "docker-compose -f docker-compose.e2e.yml -f cy-open.yml up --exit-code-from cypress",
        "test:e2e": "npm run test:server & vue-cli-service test:e2e --mode test",
        "test:server": "node ./tests/server/server.js",
      };
    case 'info':
      return {
        "docker:test:e2e": "Run e2e tests in docker",
        "test:e2e": "Run integration tests",
        "test:server": "Run mock server for tests",
      };
    case 'dep':
      return {
        "cypress": "^6.4.0",
        "json-server": "^0.16.3",
      };
    case 'devDep':
      return {
        "@cypress/vue": "^1.0.0-alpha.4",
        "@vue/cli-plugin-e2e-cypress": "^4.5.11",
        "vue-cli-plugin-cypress-experimental": "~1.2.0",
      };
    default:
      return null;
  }
}

function vuetify(remove) {
  if (remove) return null;
  return { "vuetify": "^2.3.16", }
}

module.exports = {
  update: options => ({
    "name": options.name,
    "version": "1.0.0",
    "private": true,
    "author": options.author,
    "engines": {
      "node": "v14.15.4",
      "npm": "6.14.4"
    },
    "scripts": {
      "docker:dev": "docker-compose -f docker-compose.dev.yml up",
      "docker:prod": "docker-compose -f docker-compose.prod.yml up",
      "serve": "vue-cli-service serve",
      "build": "vue-cli-service build",
      "tests": options.cypress ? "vue-cli-service test:unit --coverage=false" : "npm run test:server & vue-cli-service test:unit --coverage=false && vue-cli-service test:e2e --headless --mode test",
      "test:unit": "vue-cli-service test:unit --watch --coverage=false",
      "test:unit:coverage": "vue-cli-service test:unit --coverage && node ./jest-coverage-badges.js -output './public'",
      ...cypress(options.cypress, 'scripts'),
      "format": "prettier --write \"{tests,src,.}/**/*.{js,vue}\"",
      "lint": "npm run lint-es-vue & npm run lint-es & npm run lint-vue-scss & npm run lint-scss",
      "lint-es": "eslint --ext .js,.vue .",
      "lint-es-vue": "vue-cli-service lint --no-fix",
      "lint-scss": "sass-lint src/assets/scss/*.scss --verbose",
      "lint-vue-scss": "sass-lint-vue src",
      "check": "npm run lint && npm run tests",
      "init": "node ./cli/index.js"
    },
    "scripts-info": {
      "docker:dev": "Develop via Docker compose",
      "docker:prod": "Run project on server production",
      "serve": "Run develop server",
      "build": "Build project for production",
      "tests": options.cypress ? "Run functional tests" : "Run integration and functional tests",
      "test:unit": "Run functional tests",
      "test:unit:coverage": "Generate code coverage for functional tests",
      ...cypress(options.cypress, 'info'),
      "format": "Run code formatting",
      "lint": "Run linters for vue, js, scss files",
      "lint-es": "Run es linter",
      "lint-es-vue": "Run es-vue linter",
      "lint-scss": "Run linter for check scss files",
      "lint-vue-scss": "Run linter for check scss styles in vue files",
      "check": "Run linters and tests"
    },
    "dependencies": {
      "@sentry/tracing": "^6.0.4",
      "@sentry/vue": "^6.0.4",
      "@vuedoc/md": "^3.0.0",
      "@vuedoc/parser": "^3.3.0",
      "axios": "^0.21.1",
      "axios-mock-adapter": "^1.19.0",
      "core-js": "^3.8.0",
      "cytoscape-cola": "^2.4.0",
      "document-register-element": "^1.14.10",
      "eslint-config-prettier": "^6.15.0",
      "eslint-plugin-prettier": "^3.1.4",
      ...cypress(options.cypress, 'dep'),
      "save": "^2.4.0",
      "vue": "^2.6.12",
      "vue-cytoscape": "^1.0.8",
      "vue-router": "^3.5.1",
      ...vuetify(options.vuetify),
      "vuex": "^3.6.2",
      "webpack": "^4.44.2"
    },
    "devDependencies": {
      "@babel/plugin-proposal-nullish-coalescing-operator": "^7.12.13",
      "@babel/plugin-proposal-optional-chaining": "^7.12.13",
      "@babel/preset-env": "^7.12.13",
      "@vue/cli-plugin-babel": "^4.5.11",
      "@vue/cli-plugin-eslint": "^4.5.11",
      "@vue/cli-plugin-router": "^4.5.11",
      "@vue/cli-plugin-unit-jest": "^4.5.11",
      "@vue/cli-plugin-vuex": "^4.5.11",
      "@vue/cli-service": "^4.5.11",
      "@vue/eslint-config-airbnb": "^4.0.0",
      "@vue/test-utils": "1.0.0-beta.29",
      "babel-eslint": "^10.1.0",
      "eslint": "^5.16.0",
      "eslint-plugin-vue": "^5.0.0",
      "node-sass": "^4.14.1",
      "prettier": "^2.2.1",
      "sass-lint": "^1.13.1",
      "sass-lint-vue": "^0.4.0",
      "sass-loader": "^8.0.2",
      ...cypress(options.cypress, 'devDep'),
      "vue-i18n": "^8.22.2",
      "vue-template-compiler": "^2.6.12"
    }
  })
}