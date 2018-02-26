var express = require('express');
var router = express.Router();
var login = require('./login/index');
var board = require('./board/index');
var vote = require('./vote/index');

console.log("여기");
router.use('/login', login);
router.use('/board', board);
router.use('/vote', vote);

module.exports = router;
