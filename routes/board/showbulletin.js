const express = require('express');
const router = express.Router();
const async = require('async');
const pool = require('../../config/dbpool');
const crypto = require('crypto');

router.get('/', (req, res) => {
	let is_liked;
	let user_id = req.session.user_id;
  let bulletin_id = req.param('bulletin_id');
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
			var selectQuery = 'SELECT if((SELECT COUNT(*) FROM vote WHERE vote.user_id = ? AND vote.bulletin_id = bulletin.bulletin_id)=1, 1, 0) AS is_liked, ' +
												'bulletin.bulletin_id, bulletin.bulletin_date, bulletin.bulletin_good_count, bulletin.bulletin_ink, bulletin.bulletin_text, bulletin.topic_text, bulletin.user_id, bulletin.flag, ' +
												'users.email FROM bulletin INNER JOIN users ON users.user_id = bulletin.user_id WHERE bulletin_id = ? ORDER BY bulletin.bulletin_date DESC';
			connection.query(selectQuery, [user_id, bulletin_id], (err, rows) => {
				if(err){
					res.status(500).send({
						stat : "fail"
					});
          console.log("sadasdasdasdasaaaa");
					connection.release();
          callback("fail");
        } else{
          if(!rows[0]){
            res.status(500).send({
  						stat : "fail"
  					});
            console.log("sadasdasdasdasaaaa");
  					connection.release();
            callback("fail");
          }else{
          res.status(201).send({
            stat : "success",
            data : {
              "is_liked": rows[0].is_liked,
              "bulletin_id": rows[0].bulletin_id,
              "bulletin_date": rows[0].bulletin_date,
              "bulletin_good_count": rows[0].bulletin_good_count,
              "bulletin_ink": rows[0].bulletin_ink,
              "bulletin_text": rows[0].bulletin_text,
              "topic_text": rows[0].topic_text,
              "user_id": rows[0].user_id,
              "flag": rows[0].flag,
              "email": rows[0].email
            }
          });
          connection.release();
          callback(null, "successful rows");
        }

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
