var express = require('express');
var router = express.Router();
var getbookmark = require('./getbookmark');
var createbookmark = require('./createbookmark');
var deletebookmark = require('./deletebookmark');

router.use('/getbookmark', getbookmark);
router.use('/createbookmark', createbookmark);
router.use('/deletebookmark', deletebookmark);



module.exports = router;
