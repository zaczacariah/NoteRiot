const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', api);
app.use(express.static('public'));




app.use('/notes', (req, res) => {
    console.log("run");
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

// app.use('*', (req, res) => {
//     console.log("general");
//     res.sendFile(path.join(__dirname, './public/index.html'))
// });







app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
