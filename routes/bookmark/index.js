var express = require('express');
var router = express.Router();
var showbookmark = require('./showbookmark');
var createbookmark = require('./createbookmark');
var deletebookmark = require('./deletebookmark');

router.use('/showbookmark', showbookmark);
router.use('/createbookmark', createbookmark);
router.use('/deletebookmark', deletebookmark);



module.exports = router;
