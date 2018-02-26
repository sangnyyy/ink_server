var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const pool = require('../../config/dbpool');
const async = require('async');
const crypto = require('crypto');
var moment = require('moment');

var now = moment();
var comment_date = now.format('YYYY-MM-DD HH:mm:ss');

router.post('/', (req, res) => {
  let taskArray = [
    (callback) => {
      console.log(req.session.user_id);
      if (req.session.user_id) {
        callback(null);
      } else {
        callback("0");
        res.status(500).send({
          stat: 0,
        });
      }
    },
    (callback) => {
      pool.getConnection((err, connection) => {
        if (err) {
          res.status(500).send({
            stat: "fail",
            masg: "DB connection fail"
          });
          connection.release();
          callback("DB connection err : " + err);
        } else {
          callback(null, connection);
        }
      });
    },
    (connection, callback) => {
      let insertCommentQuery = "insert into comment(user_id, bulletin_id, comment_date, comment_text) values(?,?,?,?);";
      connection.query(insertCommentQuery, [req.session.user_id, req.body.bulletin_id, comment_date, req.body.comment_text], (err, data) => {
        if (err) {
          res.status(500).send({
  					stat: "fail",
  					masg: "insert comment error"
  				});
          connection.release();
  				callback('insert comment error' + err);
        } else {
          res.status(201).send({
            stat:"success",
            data:{
              user_id : req.session.user_id,
              bulletin_id : req.body.bulletin_id
            }
          });
          connection.release();
        }
      });
    }

  ];
  async.waterfall(taskArray, (err, result) => {
    if (err) console.log(err);
    else console.log(result);
  });
});



module.exports = router;
