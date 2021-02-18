var mongoose = require('mongoose');

var User = new mongoose.Schema({  
  name: String,
  phone: String,
  password: String
});


mongoose.model('User', User);

module.exports = mongoose.model('User');