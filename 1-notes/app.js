const fs = require('fs')
const {text, giveTextLength, getNotes} = require('./utils.js')

fs.writeFileSync('note.txt',`${text} - ${giveTextLength(text)}`)

getNotes();