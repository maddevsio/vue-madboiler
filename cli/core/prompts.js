const logSymbols = require('log-symbols');

module.exports = {
  initPrompts: [
    {
      name: 'name',
      type: 'input',
      message: 'Project name:',
      filter(val) {
        return val
          .trim()
          .toLowerCase()
          .replace(/[^+\w]/g, ' ') // Change all symbols to space
          .trim() // Remove spaces from start & end string
          .replace(/\s+/g, '-') // Change spaces to "-";
      },
      validate: value =>
        value.length ? true : `${logSymbols.warning} This field should not be empty`
    },
    {
      name: 'author',
      type: 'input',
      message: 'Author:',
      validate: value =>
        value.length ? true : `${logSymbols.warning} This field should not be empty`
    },
    {
      name: 'cypress',
      type: 'list',
      message: 'Remove cypress?',
      validate: value =>
        value.length ? true : `${logSymbols.warning} This field should not be empty`,
      filter(val) {
        return val === 'Yes';
      },
      choices: ['No', 'Yes']
    },
    {
      name: 'jest',
      type: 'list',
      message: 'Remove unit tests?',
      validate: value =>
        value.length ? true : `${logSymbols.warning} This field should not be empty`,
      filter(val) {
        return val === 'Yes';
      },
      choices: ['No', 'Yes']
    },
    {
      name: 'linter',
      type: 'list',
      message: 'Remove linter?',
      validate: value =>
        value.length ? true : `${logSymbols.warning} This field should not be empty`,
      filter(val) {
        return val === 'Yes';
      },
      choices: ['No', 'Yes']
    },
    {
      name: 'prettier',
      type: 'list',
      message: 'Remove formatter?',
      validate: value =>
        value.length ? true : `${logSymbols.warning} This field should not be empty`,
      filter(val) {
        return val === 'Yes';
      },
      choices: ['No', 'Yes']
    },
    {
      name: 'gitlabPage',
      type: 'list',
      message: 'Remove gitlab page?',
      validate: value =>
        value.length ? true : `${logSymbols.warning} This field should not be empty`,
      filter(val) {
        return val === 'Yes';
      },
      choices: ['No', 'Yes']
    },
    {
      name: 'vueDoc',
      type: 'list',
      message: 'Remove component documentation?',
      validate: value =>
        value.length ? true : `${logSymbols.warning} This field should not be empty`,
      filter(val) {
        return val === 'Yes';
      },
      choices: ['No', 'Yes']
    },
    {
      name: 'multiLanguage',
      type: 'list',
      message: 'Remove multi language settings?',
      validate: value =>
        value.length ? true : `${logSymbols.warning} This field should not be empty`,
      filter(val) {
        return val === 'Yes';
      },
      choices: ['No', 'Yes']
    },
    {
      name: 'sentry',
      type: 'list',
      message: 'Remove sentry?',
      validate: value =>
        value.length ? true : `${logSymbols.warning} This field should not be empty`,
      filter(val) {
        return val === 'Yes';
      },
      choices: ['No', 'Yes']
    }
  ]
};
