const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./config/database');
const notesRouter = require('./routes/notes');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'), {index: 'index.html'}));

// ROUTES
app.use('/notes', notesRouter);

// STATUS 500
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send('Something broke!')
});

module.exports = app;