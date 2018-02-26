var express = require('express');
var router = express.Router();
var login = require('./login/index');
var board = require('./board/index');
<<<<<<< HEAD
var vote = require('./vote/index');

=======
var ink = require('./ink/index');
var vote = require('./vote/index');
>>>>>>> f24bc0749495e0af58e55fe41e4fad1c2213046c
var schedule = require('node-schedule');
var bookmark = require('./bookmark/index');
var follow = require('./follow/index');
var topic = require('./topic/index');
var mypage = require('./mypage/index');
const mysql = require('mysql');
const pool = require('../config/dbpool');
const async = require('async');
console.log("여기");
router.use('/login', login);
router.use('/board', board);
router.use('/ink',ink);
router.use('/vote', vote);
router.use('/bookmark', bookmark);
router.use('/topic', topic);
router.use('/mypage', mypage);


var conStyle = '00 00 00 * * 0-7';
var scheduledJob4 = schedule.scheduleJob(conStyle,
  function(){
    let taskArray = [
    (callback) => {
      pool.getConnection((err, connection) => {
        if(err) callback("connection error : " + err, null);
        else callback(null, connection);
      });
    },
    (connection, callback) => {
      console.log("여긴가");
      let checkIdAndPassword = "update bulletin set bulletin_ink = bulletin_ink -1";
      connection.query(checkIdAndPassword, (err, userData) => {
        if(err){
          connection.release();
          callback("mysql proc error ", null);
        }else{
          connection.release();
          callback(null, "successful rows");
        }
      });
    }
    ];
    async.waterfall(taskArray, (err, result) => {
    if(err) console.log(err);
    else console.log(result);
    });

  }
);


module.exports = router;
