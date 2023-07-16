const { v4: uuidv4 } = require('uuid');
const express = require('express');
const path = require('path');
const fs = require("fs");
const PORT = 5001;


const app = express();

// Middleware for parsing application/json and urlencoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
});

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json','utf8', function(err, data) {
      if (err) {console.log(err);}
      
      let notes = JSON.parse(data);
      res.json(notes);
  })

});

app.post('/api/notes', (req, res) => {
  let newNotes = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text,
  };
  fs.readFile('./db/db.json','utf8', function(err, data) {
    if (err) console.log(err);
    let notes = JSON.parse(data);
    console.log(notes)
    notes.push(newNotes)
    console.log(notes)
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
      if (err) console.log(err)
      console.log("Notes saved")
    })
  })
});

app.delete('/api/notes', (req, res) => {
    console.log(`delete `);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);