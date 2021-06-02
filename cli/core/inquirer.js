const inquirer = require('inquirer');
const { initPrompts } = require('./prompts');

module.exports = {
  // sign in prompts
  askSignInCredentials: async () => inquirer.prompt(initPrompts)
};
