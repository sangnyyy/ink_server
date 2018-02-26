var express = require('express');
var router = express.Router();
var showfollow = require('./showfollow');
var createfollow = require('./createfollow');
var deletefollow = require('./deletefollow');

router.use('/showfollow', showfollow);
router.use('/createfollow', createfollow);
router.use('/deletefollow', deletefollow);



module.exports = router;
