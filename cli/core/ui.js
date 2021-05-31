const chalk = require('chalk')
const figlet = require('figlet')

module.exports = {

  title: () =>
    console.log(`${
      chalk.red(
        figlet.textSync(' VUE MADBOILER ', {
          horizontalLayout: 'full',
        })
      )}\n`)
}