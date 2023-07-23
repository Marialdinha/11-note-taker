const routerExpress = require('express').Router();
const fs = require("fs");
const {v4: uuidv4} = require('uuid');

const dbFile = "./db/db.json";

routerExpress.get('/api/notes', (req, res) => {  
    fs.readFile(dbFile, 'utf8',function(err, data) {
        if (err) {console.log(err);}
  
        let notes = JSON.parse(data);
        console.log("Data R E A D")
        console.log(data)
        res.json(notes);
    })
  });

  routerExpress.post('/api/notes', (req, res) => {
    let newNotes = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
    };
    fs.readFile(dbFile,'utf8', function(err, data) {
      if (err) {console.log(err);}
      let notes = JSON.parse(data);
      console.log("Data Before")
      console.log(notes)
      notes.push(newNotes)
      console.log("Data After")
      console.log(notes)
      fs.writeFile(dbFile, JSON.stringify(notes), (err) => {
        if (err) {console.log(err)}
        console.log("Notes saved")
      })
    })
});


module.exports = routerExpress;