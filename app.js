'use strict'; 

const express = require('express');
// const cors = require('cors');
const path = require('path');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const db = require('./config/database');
const notesRouter = require('./routes/notes');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors());

// HANDLEBARS TEMPLATES
// app.set('view engine', 'hbs');
// app.engine('.hbs', hbs({
//   defaultLayout: 'main',
//   extname: '.hbs',
//   partialsDir: path.join(__dirname, 'views/partials')
// }));
// app.set('view engine', '.hbs');
// app.set('views', path.join(__dirname, 'views'));

// // STATIC FILES
// app.use(express.static('public'));
// app.use(express.static('files'));
app.use(express.static(path.join(__dirname, 'public'), {index: 'index.html'}));

// ROUTES
app.use('/notes', notesRouter);
app.use(index);

// STATUS 500
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send('Something broke!')
});

module.exports = app;