const logSymbols = require('log-symbols')

module.exports = {
  initPrompts: [{
      name: 'name',
      type: 'input',
      message: 'Project name:',
      validate: value => value.length ?
        true : logSymbols.warning + ' This field should not be empty'
    },
    {
      name: 'author',
      type: 'input',
      message: 'Author:',
      validate: value => value.length ?
        true : logSymbols.warning + ' This field should not be empty'
    },
    {
      name: 'cypress',
      type: 'list',
      message: 'Use cypress?',
      validate: value => value.length ?
        true : logSymbols.warning + ' This field should not be empty',
      filter(val) {
        return val === 'Yes' ? true : false;
      },
      choices: ['Yes', 'No']
    },
    {
      name: 'jest',
      type: 'list',
      message: 'Use unit tests?',
      validate: value => value.length ?
        true : logSymbols.warning + ' This field should not be empty',
      filter(val) {
        return val === 'Yes' ? true : false;
      },
      choices: ['Yes', 'No']
    },
    {
      name: 'sentry',
      type: 'list',
      message: 'Use sentry?',
      validate: value => value.length ?
        true : logSymbols.warning + ' This field should not be empty',
      filter(val) {
        return val === 'Yes' ? true : false;
      },
      choices: ['Yes', 'No']
    },
    {
      name: 'linter',
      type: 'list',
      message: 'Use linter?',
      validate: value => value.length ?
        true : logSymbols.warning + ' This field should not be empty',
      filter(val) {
        return val === 'Yes' ? true : false;
      },
      choices: ['Yes', 'No']
    },
    {
      name: 'formatter',
      type: 'list',
      message: 'Use formatter?',
      validate: value => value.length ?
        true : logSymbols.warning + ' This field should not be empty',
      filter(val) {
        return val === 'Yes' ? true : false;
      },
      choices: ['Yes', 'No']
    },
    {
      name: 'docker',
      type: 'list',
      message: 'Use docker?',
      validate: value => value.length ?
        true : logSymbols.warning + ' This field should not be empty',
      filter(val) {
        return val === 'Yes' ? true : false;
      },
      choices: ['Yes', 'No']
    },
    {
      name: 'badges',
      type: 'list',
      message: 'Use coverage badges?',
      validate: value => value.length ?
        true : logSymbols.warning + ' This field should not be empty',
      filter(val) {
        return val === 'Yes' ? true : false;
      },
      choices: ['Yes', 'No']
    },
    {
      name: 'gitlabPage',
      type: 'list',
      message: 'Use gitlab page?',
      validate: value => value.length ?
        true : logSymbols.warning + ' This field should not be empty',
      filter(val) {
        return val === 'Yes' ? true : false;
      },
      choices: ['Yes', 'No']
    },
    {
      name: 'componentDocs',
      type: 'list',
      message: 'Use component documentation?',
      validate: value => value.length ?
        true : logSymbols.warning + ' This field should not be empty',
      filter(val) {
        return val === 'Yes' ? true : false;
      },
      choices: ['Yes', 'No']
    },
  ]
}
