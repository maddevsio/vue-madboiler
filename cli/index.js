const ora = require('ora')
const chalk = require('chalk')
const clear = require('clear')
const ui = require('./core/ui')
const inquirer = require('./core/inquirer')
const cleaner = require('./core/cleaner')
const { exec } = require('child_process')

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
    text: `${chalk.green('Cleaning...\n')}`,
    color: 'yellow',
  }).start()

  // Run cleaner
  await cleaner.run(credentials);
  
  spinner.stop();

  console.log(`\n ${chalk.green('Succesfully cleanup\n')}`)

  spinner = ora({
    text: `${chalk.green('Installing packages...\n')}`,
    color: 'yellow',
  }).start()

  exec('npm install --legacy-peer-deps', (error, stdout, stderr) => {
    spinner.stop()
    console.log(`\n ${chalk.green('Installation completed')}`)
    if (error) {
      console.log(`error: ${error.message}`)
      return
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`)
      return
    }
    console.log(`stdout: ${stdout}`)
  });
}

run()
