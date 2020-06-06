'use strict'; 

const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('./config/database.js');
const hbs = require('express-handlebars');
const app = express();
const router = express.Router();

// HANDLEBARS TEMPLATES
app.set('view engine', 'hbs');
app.engine('.hbs', hbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
  
// app.use(express.static(path.join(__dirname, 'public'), {index: 'index.html'}));
app.use(express.static('public'));
app.use(express.static('files'));

app.use(cors());

app.get('/', (req, res) => {
  res.render('home', {
    title: 'CAS-FEE-2020 - PROJECT I',
    subtitle: 'notes',
    description: 'Lorem ipsum',
    slogan: 'The to do list to organize work & life.',
    footer: 'HSR - Fachhochschule Rapperswil - CAS-FEE-2020',
    sorting_title: 'Sort your notes by:',
    form_title: 'Add your note',
    form_description: 'Add your description to your note. Add a title and place a finish date. Dont forget to place importance!',
    form_update_title: 'Update your note'
  });
});

app.use((err, request, response, next) => {
  // log the error, for now just console.log
  console.log(err)
  response.status(500).send('Something broke!')
});

module.exports = app;