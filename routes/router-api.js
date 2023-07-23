const routerApi = require('express').Router();
const fs = require("fs");
const {v4: uuidv4} = require('uuid');

const dbFile = "./db/db.json";

routerApi.get('/api/notes', (req, res) => {  
    fs.readFile(dbFile, 'utf8',function(err, data) {
        if (err) {console.log(err);}
  
        let notes = JSON.parse(data);
        res.json(notes);
    })
    // let notesData = readData();
    // console.log("Inside get route")
    // console.log (Promise.resolve(notesData))
    // // let notes = JSON.parse(readData());
    // // res.json(notes);
  });

routerApi.post('/api/notes', (req, res) => {
    let newNotes = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
    };
    fs.readFile(dbFile,'utf8', function(err, data) {
      if (err) {console.log(err);}
      let notes = JSON.parse(data);
      notes.push(newNotes)
      fs.writeFile(dbFile, JSON.stringify(notes), (err) => {
        if (err) {console.log(err)}
        console.log("Notes saved")
      })
    })
});

routerApi.delete('/api/notes/:id', (req, res) => {
  fs.readFile(dbFile,'utf8', function(err, data) {
    if (err) {console.log(err);}
    let notes = JSON.parse(data);
    const newNotes = notes.filter((note) => { 
      return note.id !== req.params.id;
    });

    console.log(newNotes);
    fs.writeFileSync(dbFile, JSON.stringify(newNotes), (err) => {
      if (err) {console.log(err)}
      console.log("Notes deleted")
    })
})

 });

const readData = async () =>{
  let notes = await fs.readFileSync(dbFile, 'utf8') 
  console.log("Inside readData function")
console.log(notes);
return notes;
}

module.exports = routerApi;