var express = require('express');
var router = express.Router();
var showmywrite = require('./showmywrite');
var deletemywrite = require('./deletemywrite');
var myinfo = require('./myinfo');

router.use('/showmywrite', showmywrite);
router.use('/deletemywrite', deletemywrite);
router.use('/myinfo', myinfo);

module.exports = router;
