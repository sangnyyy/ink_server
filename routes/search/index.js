var express = require('express');
var router = express.Router();
var tag = require('./tag');


router.use('/tag', tag);


module.exports = router;
