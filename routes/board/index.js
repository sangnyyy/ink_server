var express = require('express');
var router = express.Router();
var showbulletin = require('./showbulletin');

router.use('/showbulletin', showbulletin);





module.exports = router;
