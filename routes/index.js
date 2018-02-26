var express = require('express');
var router = express.Router();
var login = require('./login/index');
var board = require('./board/index');

console.log("여기");
router.use('/login', login);
router.use('/board', board);

module.exports = router;
