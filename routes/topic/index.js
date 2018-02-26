var express = require('express');
var router = express.Router();
var getTopic = require('./getTopic');

router.use('/getTopic', getTopic);



module.exports = router;
