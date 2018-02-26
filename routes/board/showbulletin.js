const express = require('express');
const router = express.Router();
const async = require('async');
const pool = require('../../config/dbpool');
const crypto = require('crypto');

router.get('/', (req, res) => {
	let is_liked;
	let user_id = req.session.user_id;
	var taskArray = [

		(callback) =>{
			console.log(req.session.user_id);
			if(req.session.user_id){
				callback(null);
			}else{
				callback("0")
				res.status(500).send({
					stat : 0,
				});
			}
		},
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
			var selectQuery = 'SELECT if((SELECT COUNT(*) FROM vote WHERE vote.user_id = ? AND vote.bulletin_id = bulletin.bulletin_id)=1, 1, 0) AS is_liked, bulletin_id, bulletin_date, bulletin_good_count, bulletin_ink, bulletin_text, topic_text, user_id FROM bulletin limit 20';
			connection.query(selectQuery, user_id, (err, rows) => {
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
