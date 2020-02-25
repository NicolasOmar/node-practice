// MODULE IMPORTS
const chalk = require('chalk')
// FUNCTIONS
const Messages = {
    success: (msg) => log(chalk.white.bold.bgGreen(msg)),
    warning: (msg) => log(chalk.black.bold.bgYellow(msg)),
    fail: (msg) => log(chalk.white.bold.bgRed(msg)),
}
const log = (text) => console.log(text)

module.exports = {
    msg: Messages
};