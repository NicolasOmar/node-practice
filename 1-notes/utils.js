const chalk = require('chalk')
// EXPORT
const text = 'This is an idea.'
const giveTextLength = (text) => text.length
const getNotes = () => console.warn(chalk.white.bold.bgGreen('Your notes have been updated.'))

module.exports = {
    text,
    giveTextLength,
    getNotes
};