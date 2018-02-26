var express = require('express');
var router = express.Router();
var showbulletin = require('./showbulletin');
var showlist = require('./showlist');
var createbulletin = require('./createbulletin');

router.use('/showbulletin', showbulletin);
router.use('/showlist', showlist);
router.use('/createbulletin', createbulletin);





module.exports = router;
