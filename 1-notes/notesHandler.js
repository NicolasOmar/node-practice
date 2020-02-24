const fs = require('fs')
const {msg} = require('./utils.js')

const getNotes = () => console.log('test')

const addNote = (newNote) => {
    const notes = loadNotes()
    const hasDuplicated = findNote(notes, newNote.title)

    if (hasDuplicated) {
        msg.fail('There is an already created note.')
    } else {
        notes.push(newNote)
        saveNotes(notes)
        msg.success('New note added.')
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const noteFinded = findNote(notes, title)

    if (noteFinded) {
        const index = notes.indexOf(noteFinded)
        notes.splice(index, 1)
        saveNotes(notes)
        msg.success(`Note '${title}' succesfully removed`)
    } else {
        msg.fail(`There is no note with title '${title}'.`)
    }
}

const listNotes = () => {
    const notes = loadNotes()

    if (notes.length) {
        const titles = notes.map((item) => ` '${item.title}'`)
        msg.success(`Listed notes:${titles}`)
    } else {
        msg.fail('There are no loaded notes to list.')
    }
}

const readNote = (title) => {
    const noteFinded = findNote(loadNotes(), title)

    if (noteFinded) {
        msg.success(`Note finded. Title: ${noteFinded.title}. Body: ${noteFinded.body}`)
    } else {
        msg.fail(`The note with title '${title}' doesn´t exists.`)
    }
}

const saveNotes = (notesArray) => fs.writeFileSync('note.json', JSON.stringify(notesArray))

const findNote = (notes, title) => notes.find((item) => item.title === title)

const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('note.json'))
    } catch(e) {
        return []
    }
}

module.exports = {
    getNotes,
    addNote,
    removeNote,
    listNotes,
    readNote
}