const ora = require('ora');
const chalk = require('chalk');
const clear = require('clear');
const { exec } = require('child_process');
const ui = require('./core/ui');
const inquirer = require('./core/inquirer');
const cleaner = require('./core/cleaner');

// clear console
clear();

// display title
ui.title();

// main execution
const run = async () => {
  // prompt credentials
  const credentials = await inquirer.askSignInCredentials();

  // invoke spinner
  const spinner = ora({
    text: `${chalk.green('Cleaning...\n')}`,
    color: 'yellow'
  }).start();

  // Run cleaner
  await cleaner.run(credentials);

  spinner.stop();

  console.log(`\n ${chalk.green('Successful setup 👍\n')}`);

  const install = ora({
    text: `${chalk.green('Installing packages...\n')}`,
    color: 'yellow'
  }).start();

  exec('npm install --legacy-peer-deps', (error, stdout, stderr) => {
    install.stop();
    if (error) {
      console.log(`\n ${chalk.yellow(`error: ${error.message}`)}`);
    }
    if (stderr) {
      console.log(`\n ${chalk.yellow(`stderr: ${stderr}`)}`);
    }
    console.log(`\n ${chalk.yellow(`stdout: ${stdout}`)}`);
    console.log(`\n ${chalk.green('Installation completed')}`);
    console.log(`\n ${chalk.green('The command to start the project is: npm run serve\n\n')}`);
  });
};

run();
