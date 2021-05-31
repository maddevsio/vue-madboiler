const inquirer = require('inquirer')
const { initPrompts } = require('./prompts')

module.exports = {

  // sign in prompts
  askSignInCredentials: async () =>
    inquirer.prompt(initPrompts),

  // ask whether to keep signed in
  keepSignedIn: async () =>
    inquirer.prompt([
      {
        name: 'keepSignedIn',
        type: 'confirm',
        message: 'Do you want to stay signed in on this device?'
      }
    ]),

  // generate main menu items
  mainOptions: async () =>
    inquirer.prompt([
      {
        name: 'option',
        type: 'rawlist',
        message: 'Choose an Option:\n',
        choices: [
          'Get Total Users',
          'Manage Users',
          new inquirer.Separator(),
          'Sign Out and Exit',
          'Exit',
        ]
      }
    ]),
}