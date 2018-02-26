var express = require('express');
var router = express.Router();
var login = require('./login/index');
var board = require('./board/index');
var bookmark = require('./bookmark/index');
var topic = require('./topic/index');

console.log("여기");
router.use('/login', login);
router.use('/board', board);
router.use('/bookmark', bookmark);
router.use('/topic', topic);


module.exports = router;
