const express = require('express');
const router = express.Router();
const async = require('async');
const pool = require('../../config/dbpool');
const crypto = require('crypto');

var session = require('express-session');



router.post('/', (req, res) => {
console.log("asd");
  var object = [];
	var taskArray = [
		//1. connection을 pool로부터 가져옴		(callback)=> {
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
  				res.status(501).send({
  					stat: "fail"
  				});
  				callback("connection error : ",null);
  			}
  			else callback(null, connection);
  		});
		},
    (connection, callback) => {
      let updateink = "select * from users where user_id=?";
      connection.query(updateink, [req.session.user_id], (err, rows) => {
        if(err){
          connection.release();
          res.status(501).send({
            stat: "101"
          });
          callback("101", null);
        }else{
          if(rows[0].ink-req.body.bulletin_ink<0){
            res.status(501).send({
              stat:101
            });
            callback("101", null);

          }else{
            callback(null,connection);
          }
        }
      });
    },
    (connection, callback) => {
      let updateink = "update bulletin set bulletin_ink = bulletin_ink+? where bulletin_id = ?;";
      connection.query(updateink, [req.body.bulletin_ink,req.body.bulletin_id], (err, rows) => {
        if(err){
          connection.release();
          res.status(501).send({
            stat: "102"
          });
          callback("102", null);
        }else{
          console.log(rows);
        if(rows.changedRows==1){
          console.log("success");
            callback(null, connection);
        }else{
          console.log("fail");
          connection.release();
          res.status(501).send({
            stat: "103"
          });
          callback("103", null);
        }
        }
      });
    },
    (connection, callback) => {
      let updateink = "update users set ink = ink-? where user_id = ?;";
      console.log([req.body.bulletin_ink,req.session.user_id]);
      connection.query(updateink, [req.body.bulletin_ink,req.session.user_id], (err, rows) => {
        if(err){
          connection.release();
          res.status(501).send({
            stat: "104"
          });
          callback("104", null);
        }else{
        if(rows.changedRows==1){
          callback(null, connection);
        }else{
          callback("105");
        }
        }
      });
    },
    (connection, callback) => {
      let updateink = "select * from bulletin where bulletin_id=?";
      connection.query(updateink, [req.body.bulletin_id], (err, rows) => {
        if(err){
          connection.release();
          res.status(501).send({
            stat: "106"
          });
          callback("106", null);
        }else{
          res.status(200).send({
              "stat":"success",
              "data":rows
          });
        }
      });
    }


	];
	async.waterfall(taskArray, (err, result) => {
		if(err) console.log(err);
		else console.log(result);
	});
});

module.exports = router;
