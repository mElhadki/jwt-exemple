var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


var checkTheToken = require('./routes.verifyToken');
var config = require('../config/config.secret');
var User = require('../models/user.model');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');



router.post('/login', function (req, res) {
  User.findOne({ email: req.body.email }).then((user) => {
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
  
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 
    })
    res.status(200).send({ auth: true, token: token })
  }).catch((err) => {
    if (err) return res.status(500).send('Error server.')
  });

});



router.get('/logout', function (req, res) {
  res.status(200).send({ auth: false, token: null });
});


router.post('/register', function (req, res) {

  var hashpw = bcrypt.hashSync(req.body.password, 8);

  User.create({name: req.body.name, email: req.body.email, password: hashpw}).then((user) => {

      var tkn = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400
      });
      res.status(200).send({ auth: true, token: tkn });
  }).catch(() => res.status(500).send("error...."))

});

 
router.get('/myaccount', checkTheToken, function (req, res, next) {
  User.findById(req.userId, { password: 0 })
  .then((user) => {res.status(200).send(user)})
  .catch((err) => res.status(500).send("error..."))

});

module.exports = router;