var express = require('express');
var router = express.Router();
var showmywrite = require('./showmywrite');
var deletemywrite = require('./deletemywrite');


router.use('/showmywrite', showmywrite);
router.use('/deletemywrite', deletemywrite);


module.exports = router;
