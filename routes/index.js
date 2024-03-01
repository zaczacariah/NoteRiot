const router = require('express').Router();

const notesRouter = require('./notes'); // Notes Endpoint

router.use('/notes', notesRouter); // Route to notes endpoint 

module.exports = router;