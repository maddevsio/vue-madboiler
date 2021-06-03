function cypress(remove, key) {
  if (remove) return null;
  switch (key) {
  case 'scripts':
    return {
      'docker:test:e2e':
        'docker-compose -f docker-compose.e2e.yml -f cy-open.yml up --exit-code-from cypress',
      'test:e2e': 'npm run test:server & vue-cli-service test:e2e --mode test',
      'test:server': 'node ./tests/server/server.js'
    };
  case 'info':
    return {
      'docker:test:e2e': 'Run e2e tests in docker',
      'test:e2e': 'Run integration tests',
      'test:server': 'Run mock server for tests'
    };
  case 'dep':
    return {
      cypress: '^6.4.0',
      'json-server': '^0.16.3'
    };
  case 'devDep':
    return {
      '@cypress/vue': '^1.0.0-alpha.4',
      '@vue/cli-plugin-e2e-cypress': '^4.5.11',
      'vue-cli-plugin-cypress-experimental': '~1.2.0'
    };
  default:
    return null;
  }
}

function linter(remove, key) {
  if (remove) return null;
  switch (key) {
  case 'scripts':
    return {
      lint: 'npm run lint-es-vue & npm run lint-es & npm run lint-vue-scss & npm run lint-scss',
      'lint-es': 'eslint --ext .js,.vue .',
      'lint-es-vue': 'vue-cli-service lint --no-fix',
      'lint-scss': 'sass-lint src/assets/scss/*.scss --verbose',
      'lint-vue-scss': 'sass-lint-vue src'
    };
  case 'info':
    return {
      lint: 'Run linters for vue, js, scss files',
      'lint-es': 'Run es linter',
      'lint-es-vue': 'Run es-vue linter',
      'lint-scss': 'Run linter for check scss files',
      'lint-vue-scss': 'Run linter for check scss styles in vue files'
    };
  case 'dep':
    return {
      'eslint-config-prettier': '^6.15.0',
      'eslint-plugin-prettier': '^3.1.4'
    };
  case 'devDep':
    return {
      '@vue/cli-plugin-eslint': '^4.5.11',
      '@vue/eslint-config-airbnb': '^4.0.0',
      'babel-eslint': '^10.1.0',
      eslint: '^5.16.0',
      'eslint-plugin-vue': '^5.0.0',
      'sass-lint': '^1.13.1',
      'sass-lint-vue': '^0.4.0'
    };
  default:
    return null;
  }
}

function jest(remove, key) {
  if (remove) return null;
  switch (key) {
  case 'scripts':
    return {
      'test:unit': 'vue-cli-service test:unit --watch --coverage=false',
      'test:unit:coverage':
        'vue-cli-service test:unit --coverage && node ./jest-coverage-badges.js -output "./public"'
    };
  case 'info':
    return {
      'test:unit': 'Run functional tests',
      'test:unit:coverage': 'Generate code coverage for functional tests'
    };
  case 'devDep':
    return {
      '@vue/test-utils': '1.0.0-beta.29',
      '@vue/cli-plugin-unit-jest': '^4.5.11'
    };
  default:
    return null;
  }
}

function prettier(remove, key) {
  if (remove) return null;
  switch (key) {
  case 'scripts':
    return {
      format: 'prettier --write "{tests,src,.}/**/*.{js,vue}"'
    };
  case 'info':
    return {
      format: 'Run code formatting'
    };
  case 'devDep':
    return {
      prettier: '^2.2.1'
    };
  default:
    return null;
  }
}

function vueDoc(remove, key) {
  if (remove) return null;
  switch (key) {
  case 'dep':
    return {
      '@vuedoc/md': '^3.0.0',
      '@vuedoc/parser': '^3.3.0'
    };
  default:
    return null;
  }
}

function multiLanguage(remove, key) {
  if (remove) return null;
  switch (key) {
  case 'devDep':
    return {
      'vue-i18n': '^9.1.6'
    };
  default:
    return null;
  }
}

function sentry(remove, key) {
  if (remove) return null;
  switch (key) {
  case 'dep':
    return {
      '@sentry/tracing': '^6.0.4',
      '@sentry/vue': '^6.0.4'
    };
  default:
    return null;
  }
}

function tests(options, key) {
  if (!options.jest && !options.cypress) return null;
  switch (key) {
  case 'scripts':
    if (options.jest && options.cypress)
      return {
        tests:
          'npm run test:server & vue-cli-service test:unit --coverage=false && vue-cli-service test:e2e --headless --mode test'
      };
    if (options.jest && !options.cypress)
      return { tests: 'vue-cli-service test:unit --coverage=false' };
    if (!options.jest && options.cypress)
      return { tests: 'npm run test:server & vue-cli-service test:e2e --headless --mode test' };
    return null;
  case 'info':
    if (options.jest && options.cypress) return { tests: 'Run integration and functional tests' };
    if (options.jest && !options.cypress) return { tests: 'Run functional tests' };
    if (!options.jest && options.cypress) return { tests: 'Run integration tests' };
    return null;
  default:
    return null;
  }
}

module.exports = {
  update: options => ({
    name: options.name,
    version: '1.0.0',
    private: true,
    author: options.author,
    engines: {
      node: 'v14.15.4',
      npm: '6.14.4'
    },
    scripts: {
      ...tests(options, 'scripts'),
      ...linter(options.linter, 'scripts'),
      ...jest(options.jest, 'scripts'),
      ...cypress(options.cypress, 'scripts'),
      ...prettier(options.prettier, 'scripts'),
      'docker:dev': 'docker-compose -f docker-compose.dev.yml up',
      'docker:prod': 'docker-compose -f docker-compose.prod.yml up',
      serve: 'vue-cli-service serve',
      build: 'vue-cli-service build'
    },
    'scripts-info': {
      ...tests(options, 'info'),
      ...linter(options.linter, 'info'),
      ...jest(options.jest, 'info'),
      ...cypress(options.cypress, 'info'),
      'docker:dev': 'Develop via Docker compose',
      'docker:prod': 'Run project on server production',
      serve: 'Run develop server',
      build: 'Build project for production'
    },
    dependencies: {
      ...sentry(options.sentry, 'dep'),
      ...linter(options.linter, 'dep'),
      ...cypress(options.cypress, 'dep'),
      ...vueDoc(options.vueDoc, 'dep'),
      axios: '^0.21.1',
      'axios-mock-adapter': '^1.19.0',
      'core-js': '^3.8.0',
      "cytoscape": "^3.19.0",
      'cytoscape-cola': '^2.4.0',
      'document-register-element': '^1.14.10',
      save: '^2.4.0',
      vue: '^3.0.0-beta.1',
      'vue-router': '^4.0.8',
      vuex: '^4.0.1',
      webpack: '^4.44.2'
    },
    devDependencies: {
      ...linter(options.linter, 'devDep'),
      ...jest(options.jest, 'devDep'),
      ...prettier(options.prettier, 'devDep'),
      ...cypress(options.cypress, 'devDep'),
      ...multiLanguage(options.multiLanguage, 'devDep'),
      '@vue/compiler-sfc': '^3.0.0-beta.1',
      '@babel/plugin-proposal-nullish-coalescing-operator': '^7.12.13',
      '@babel/plugin-proposal-optional-chaining': '^7.12.13',
      '@babel/preset-env': '^7.12.13',
      '@vue/cli-plugin-babel': '^4.5.11',
      '@vue/cli-plugin-router': '^4.5.11',
      '@vue/cli-plugin-vuex': '^4.5.11',
      '@vue/cli-service': '^4.5.13',
      'node-sass': '^4.14.1',
      'sass-loader': '^8.0.2',
      'vue-template-compiler': '^2.6.12'
    }
  })
};
