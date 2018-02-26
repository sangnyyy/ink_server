var express = require('express');
var router = express.Router();
var votecount = require('./votecount');
<<<<<<< HEAD
//var showvotecount = require('./showvotecount');
=======
>>>>>>> 6a329faa35edc1920d878211c61f845728aff955
var showvoteuser = require('./showvoteuser');
var deletevotecount = require('./deletevotecount');

console.log("vote");
/* GET home page. */
router.use('/votecount', votecount);
router.use('/showvoteuser', showvoteuser);
router.use('/deletevotecount', deletevotecount);

module.exports = router;
