var express = require('express');
var router = express.Router();

var showbulletin = require('./showbulletin');
var createbulletin = require('./createbulletin');

router.use('/showbulletin', showbulletin);
router.use('/createbulletin', createbulletin);

module.exports = router;
