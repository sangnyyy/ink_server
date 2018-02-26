var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const pool = require('../../config/dbpool');
const async = require('async');
const crypto = require('crypto');


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
      let deleteBookmarkQuery = "DELETE FROM follower where follower_user_id = ?";
      connection.query(deleteBookmarkQuery, req.body.follower_user_id, (err, data) => {
        if (err) {
          res.status(500).send({
  					stat: "fail",
  					masg: "delete follow error"
  				});
          connection.release();
  				callback('delete follow error' + err);
        } else {
          res.status(201).send({
            stat:"delete follow success",
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
