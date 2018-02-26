const express = require('express');
const router = express.Router();
const async = require('async');
const pool = require('../../config/dbpool');
const crypto = require('crypto');

var session = require('express-session');



router.get('/', (req, res) => {
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
      let updateink = "update bulletin set bulletin_ink = bulletin_ink+? where bulletin_id = ?;";
      connection.query(updateink, [req.body.bulletin_ink,req.body.bulletin_id], (err, rows) => {
        if(err){
          connection.release();
          res.status(501).send({
            stat: "fail"
          });
          callback("mysql proc error ", null);
        }else{
          console.log(rows);
          res.json(rows);
          callback(null, userData);
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
