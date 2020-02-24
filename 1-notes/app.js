const yargs = require('yargs')
const {addNote, removeNote, listNotes, readNote} = require('./notesHandler.js')

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        const data = {title: argv.title, body: argv.body}
        addNote(data)
    }
})

yargs.command({
    command: 'remove',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    describe: 'Remove a note',
    handler: (argv) => removeNote(argv.title)
})

yargs.command({
    command: 'list',
    describe: 'List all the notes',
    handler: () => listNotes()
})

yargs.command({
    command: 'read',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    describe: 'Reading a note',
    handler: (argv) => readNote(argv.title)
})

console.warn(yargs.argv)