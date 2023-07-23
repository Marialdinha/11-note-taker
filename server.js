const express = require('express');
const api = require("./routes/router-api")
const path = require('path');
const PORT = 3001;

const app = express();

// Middleware for parsing application/json and urlencoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Middleware for front-end
app.use(express.static('public'));
// Middleware for front-end
app.use(api);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
