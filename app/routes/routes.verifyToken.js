
var jwt = require('jsonwebtoken');
var config = require('../config/config.secret');
  
  var checkTheToken = (req, res, next) => {
    var token = req.headers['x-access-token'];
    if (!token)
      return res.status(403).send(
        {
          auth: false,
          message: 'token please ...'
        });
  
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err)
        return res.status(500).send(
          {
            auth: false,
            message: 'false token'
          });
      req.userId = decoded.id;
      
      next();
    });
  
  }
  
  module.exports = checkTheToken;