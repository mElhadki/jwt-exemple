var express = require('express');
var app = express();

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/login', { useMongoClient: true })
.then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

var UserController = require('./app/routes/routes.user');
app.use('/user', UserController);

var BookController = require('./app/routes/routes.book');
app.use('/book', BookController);


var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log('server listening on port ' + port);
});