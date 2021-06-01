const ora = require('ora')
const chalk = require('chalk')
const clear = require('clear')
const ui = require('./core/ui')
const inquirer = require('./core/inquirer')
const cleaner = require('./core/cleaner')

// clear console
clear()

// display title
ui.title()

// main execution
const run = async () => {

  // prompt credentials
  const credentials = await inquirer.askSignInCredentials()

  // invoke spinner
  spinner = ora({
    text: `${chalk.green('Cleaning...')}`,
    color: 'yellow',
  }).start()

  // Run cleaner
  await cleaner.run(credentials);
  
  spinner.stop();

  console.log(`\n ${chalk.green('Succesfully cleanup')}`)
}

run()
