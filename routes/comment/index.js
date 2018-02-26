var express = require('express');
var router = express.Router();

var createcomment = require('./createcomment');
var deletecomment = require('./deletecomment');
var showcomment = require('./showcomment');
router.use('/createcomment', createcomment);
router.use('/deletecomment', deletecomment);
router.use('/showcomment', showcomment);



module.exports = router;
