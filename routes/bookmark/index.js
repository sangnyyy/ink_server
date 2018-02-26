var express = require('express');
var router = express.Router();
var getBookmark = require('./getBookmark');
var createBookmark = require('./createBookmark');
router.use('/getBookmark', getBookmark);
router.use('/createBookmark', createBookmark);




module.exports = router;
