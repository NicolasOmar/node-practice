const fs = require('fs')
const {msg} = require('./utils.js')

const getNotes = () => console.log('test')

const addNote = (newNote) => {
    const notes = loadNotes()
    notes.push(newNote)
    saveNotes(notes)
    msg.success('New note added')
}

const saveNotes = (notesArray) => fs.writeFileSync('note.json', JSON.stringify(notesArray))

const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('note.json'))
    } catch(e) {
        return []
    }
}

module.exports = {
    getNotes,
    addNote
}