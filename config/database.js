const mongoose = require('mongoose');

mongoose.connect(
  "mongodb://localhost/casfee2020",
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected to MongoDB database")
});

module.exports = db;