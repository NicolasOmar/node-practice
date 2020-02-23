const yargs = require('yargs')
const handler = require('./notesHandler.js')

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
        handler.addNote(data)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: () => console.log('Removing the note!')
})

yargs.command({
    command: 'read',
    describe: 'Reading a note',
    handler: () => console.log('Reading a note!')
})

yargs.command({
    command: 'list',
    describe: 'List all the notes',
    handler: () => console.log('Listing all the notes!')
})
console.warn(yargs.argv)