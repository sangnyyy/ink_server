var express = require('express');
var router = express.Router();
var showfollowing = require('./showfollowing');
var createfollowing = require('./createfollowing');
var deletefollowing = require('./deletefollowing');
var showfollower = require('./showfollower');

console.log("follow");

router.use('/showfollowing', showfollowing);
router.use('/createfollowing', createfollowing);
router.use('/deletefollowing', deletefollowing);
router.use('/showfollower', showfollower);


module.exports = router;
