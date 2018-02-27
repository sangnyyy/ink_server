var express = require('express');
var router = express.Router();
var votecount = require('./votecount');
<<<<<<< HEAD

=======
//var showvotecount = require('./showvotecount');
>>>>>>> 7ad54cfbb5b7863288d8291c8a89c3c7f598b4d2
var showvoteuser = require('./showvoteuser');
var deletevotecount = require('./deletevotecount');

console.log("vote");
/* GET home page. */
router.use('/votecount', votecount);
router.use('/showvoteuser', showvoteuser);
router.use('/deletevotecount', deletevotecount);

module.exports = router;
