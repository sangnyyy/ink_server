var express = require('express');
var router = express.Router();

var donate = require('./donate');


router.use('/donate', donate);

module.exports = router;
