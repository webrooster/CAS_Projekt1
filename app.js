'use strict'; 

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const db = require('./config/database');
const path = require('path');
const hbs = require('express-handlebars');
const notesRouter = require('./routes/notes');

const index = require('./routes/index');
const app = express();

// HANDLEBARS TEMPLATES
app.set('view engine', 'hbs');
app.engine('.hbs', hbs({
  defaultLayout: 'main',
  extname: '.hbs',
  partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
  
// STATIC FILES
app.use(express.static('public'));
app.use(express.static('files'));

// SET JSON
app.use(express.json());

// ROUTE INDEX
app.use(index);

// TBD
app.use(cors());

// ROUTE NOTES
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/notes', notesRouter);


// STATUS 500
app.use((err, request, response, next) => {
  console.log(err)
  response.status(500).send('Something broke!')
});

module.exports = app;