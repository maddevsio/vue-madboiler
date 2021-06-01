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
      message: 'Remove cypress?',
      validate: value => value.length ?
        true : logSymbols.warning + ' This field should not be empty',
      filter(val) {
        return val === 'No' ? false : true;
      },
      choices: ['No', 'Yes']
    },
    {
      name: 'jest',
      type: 'list',
      message: 'Remove unit tests?',
      validate: value => value.length ?
        true : logSymbols.warning + ' This field should not be empty',
      filter(val) {
        return val === 'No' ? false : true;
      },
      choices: ['No', 'Yes']
    },
    {
      name: 'linter',
      type: 'list',
      message: 'Remove linter?',
      validate: value => value.length ?
        true : logSymbols.warning + ' This field should not be empty',
      filter(val) {
        return val === 'No' ? false : true;
      },
      choices: ['No', 'Yes']
    },
    {
      name: 'formatter',
      type: 'list',
      message: 'Remove formatter?',
      validate: value => value.length ?
        true : logSymbols.warning + ' This field should not be empty',
      filter(val) {
        return val === 'No' ? false : true;
      },
      choices: ['No', 'Yes']
    },
    {
      name: 'gitlabPage',
      type: 'list',
      message: 'Remove gitlab page?',
      validate: value => value.length ?
        true : logSymbols.warning + ' This field should not be empty',
      filter(val) {
        return val === 'No' ? false : true;
      },
      choices: ['No', 'Yes']
    },
    {
      name: 'vueDoc',
      type: 'list',
      message: 'Remove component documentation?',
      validate: value => value.length ?
        true : logSymbols.warning + ' This field should not be empty',
      filter(val) {
        return val === 'No' ? false : true;
      },
      choices: ['No', 'Yes']
    },
    {
      name: 'multiLanguage',
      type: 'list',
      message: 'Remove multi language settings?',
      validate: value => value.length ?
        true : logSymbols.warning + ' This field should not be empty',
      filter(val) {
        return val === 'No' ? false : true;
      },
      choices: ['No', 'Yes']
    },
  ]
}
