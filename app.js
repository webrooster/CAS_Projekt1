'use strict'; 

const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const mongoose = require('mongoose');
const nodemon = require('nodemon');
const notesSchema = require('./models/note.schema.js');
const router = express.Router;


// CONNECT DATABASE
mongoose.connect('mongodb://localhost/casfee2020', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', (() => console.log('MONGO DB CONNECTED')));

// NOTES MODEL
const Note = mongoose.model('Note', notesSchema);

// MOCK DATA
const note = new Note({
  title: 'Fourth note from mongoose',
  description: 'Here comes a description',
  created: '4.6.2020, 16:10:00',
  importance: 1,
  expire: '2020-06-04',
  complete: 0,
  completed_at: '4.6.2020, 16:10:00'
});

// SAVE NOTE TO DB
// note.save();

// FIND NOTES
Note.find((err, notes) => {
  if (err) {
    console.log(err);
  } else {
    // console.log(notes);
    mongoose.connection.close();

    notes.forEach(note => {
      console.log(note.title);    
    });
  }
}); 

// UPDATE NOTE - ONE
Note.updateOne({_id: '5eda0f72d22e1adc6c4eeaa7'}, {title:'UPDATEE NEW TITLE'}, (err) => {
  if (err) console.log(err) ? console.log('successfully udpated') : console.log(err);
});

// DELETE NOTE - ONE
Note.deleteOne({_id: '5eda0f72d22e1adc6c4eeaa7'}, (err) => {
  if (err) console.log(err) ? console.log('successfully deleted') : console.log(err);
});

// ROUTES

// VIEW
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'), {index: 'index.html'}));

// catch 404 and forward to error handler

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;