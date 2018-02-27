var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const pool = require('../../config/dbpool');

const async = require('async');
const crypto = require('crypto');

var session = require('express-session');

router.post('/', (req, res) => {
  var taskArray = [
    (callback) =>{
      console.log(req.session.user_id);
      if(req.session.user_id){
        callback(null);
      }else{
        callback("0");
        res.status(500).send({
          stat : 0,
          });
      }
    },
    (callback) => {
  		pool.getConnection((err, connection) => {
  			if(err){
  				res.status(500).send({
  					stat: "fail",
  					masg: "DB connection fail"
  				});
  				connection.release();
  				callback("DB connection err : " + err);
  			}else{
  				callback(null, connection);
  			}
  		});
  	},
    (connection, callback) => {
      let deleteMyWriteQuery = "DELETE FROM bulletin where user_id=? and bulletin_id=?";
            connection.query(deleteMyWriteQuery, [req.session.user_id, req.body.bulletin_id], (err, rows) => {
              if (err) {
                res.status(500).send({
                  stat: "fail",
                  masg: "delete mywrite error"
                });
                connection.release();
                callback('delete mywrite error' + err);
              } else {
                res.status(201).send({
                  stat: "delete mywrite success",
                });
                connection.release();
                callback("delete mywrite success", null);
              }
            });
    }
  ];

  async.waterfall(taskArray, (err, result)=>{
    if(err) console.log(err);
    else console.log(result);
  });
});




module.exports = router;
