var express = require('express');
var router = express.Router();
var login = require('./login/index');
var board = require('./board/index');

var bookmark = require('./bookmark/index');
var topic = require('./topic/index');
var follow = require('./follow/index');



console.log("여기");
router.use('/login', login);
router.use('/board', board);
router.use('/bookmark', bookmark);
router.use('/topic', topic);
router.use('/follow', follow);

var ink = require('./ink/index');
var vote = require('./vote/index');
var schedule = require('node-schedule');

router.use('/ink',ink);
router.use('/vote', vote);

module.exports = router;
