const express = require('express');
const router = express.Router();
const async = require('async');
const pool = require('../../config/dbpool');
const crypto = require('crypto');

router.get('/', (req, res) => {
	var taskArray = [
		//1. connection을 pool로부터 가져옴		(callback)=> {
    (callback) => {
			pool.getConnection((err, connection) => {
				if(err){
					res.status(500).send({
						stat : "fail"
					});
					callback("DB connection err : "+ err);
				} else callback(null,connection);
			});
		},
    (connection, callback) => {
			var selectAtdQuery = 'select bulletin_id, bulletin_name, bulletin_date, bulletin_good_count, bulletin_ink, bulletin_text, topic_text, user_id FROM bulletin limit 20 ';
			connection.query(selectAtdQuery, (err, rows) => {
				if(err){
					res.status(500).send({
						stat : "fail"
					});
          console.log("sadasdasdasdasaaaa");
					connection.release();
          callback("fail");
        } else{
          res.status(201).send({
            stat : "success",
            data : rows
          });
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
});

module.exports = router;
