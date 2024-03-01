const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid'); // Id generator

// Get Request
notes.get('/', (req, res) => {
    
    //Return all notes from file
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data));
    });
})

// Post Request
// Add a new note 
notes.post('/', (req, res) => {
    console.log(`${req.method} request received to add note`);


    const { title, text } = req.body;
    

    // Data sanitisation
    if(req.body && title && text){
        const newNote = { //New Note to write to file
            title,
            text,
            note_id: uuid()
        };

        readAndAppend(newNote, './db/db.json');
        res.json(newNote);
    } else {
        res.status(400).json();
    }
});


// Delete Request
// Filter out current note from file and write rest
notes.delete('/:id', (req, res) => {
    const noteid = req.params.id;

    readFromFile('./db/db.json').then((data) => {
        data = JSON.parse(data);
        const newData = data.filter((note) => note.note_id != noteid);

        writeToFile('./db/db.json', newData);

        res.status(202).json('Record Deleted');
    })
})



module.exports = notes;