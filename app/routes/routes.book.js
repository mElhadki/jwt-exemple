const router = require("express").Router();
let Book = require("../models/book.model");
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var checkTheToken = require('./routes.verifyToken');

router.get("/", checkTheToken, (req, res) => {
  Book.find()
    .then((menu) => res.json(menu))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.post("/add", checkTheToken, (req, res) => {

    const name = req.body.name;
    const author = req.body.author;
    const price = req.body.price;

    const bookPush = new Book({
      name,
      author,
      price

    });

    bookPush
      .save()
      .then(() => res.json("Book successfully added"))
      .catch((err) => res.status(400).json("Error :" + err));
});


module.exports = router;