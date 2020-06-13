require('dotenv').config();
const mongoose = require('mongoose'); 

mongoose.connect(process.env.DATABASE_URL + process.env.DB_NAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB database", db.name);
});

mongoose.set('debug', true);

module.exports = db;