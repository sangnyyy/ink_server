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
      let deleteQuery = "DELETE FROM bookmark where user_id = ? and bulletin_id = ?;";
          connection.query(deleteQuery, [req.session.user_id, req.body.bulletin_id], (err, rows) => {
              if (err) {
                res.status(500).send({
                  stat: "fail",
                  masg: "delete bookmark error"
                });
                connection.release();
                callback('delete bookmark error' + err);
              } else {
                res.status(201).send({
                  stat: "delete bookmark success",
                });
                connection.release();
                callback("delete success", null);
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
