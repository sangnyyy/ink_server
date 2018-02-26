var express = require('express');
var router = express.Router();
var showtopic = require('./showtopic');

router.use('/showtopic', showtopic);



module.exports = router;
