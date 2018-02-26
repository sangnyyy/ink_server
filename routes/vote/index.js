var express = require('express');
var router = express.Router();
var votecount = require('./votecount');
<<<<<<< HEAD
//var showvotecount = require('./showvotecount');
=======
>>>>>>> 355ded21f7786f292b6b1603c252c697cd5e3a2f
var showvoteuser = require('./showvoteuser');
var deletevotecount = require('./deletevotecount');

console.log("vote");
/* GET home page. */
router.use('/votecount', votecount);
router.use('/showvoteuser', showvoteuser);
router.use('/deletevotecount', deletevotecount);

module.exports = router;
