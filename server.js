// Imports
const express = require('express');
const api = require("./routes/router-api")
const path = require('path');

// Specify on which port the Express.js server will run
const PORT = process.env.PORT || 3001;
// Initialize an instance of Express.js
const app = express();

// Middleware for parsing application/json and urlencoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Middleware for front-end
app.use(express.static('public'));
// Middleware for api router
app.use(api);

// HTML routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
});

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
