const express = require('express');
const router = express.Router();
const async = require('async');
const pool = require('../../config/dbpool');
const crypto = require('crypto');

console.log("showvoteuser");

router.get('/', (req, res) => {
  var bulletin_id = req.param('bulletin_id');
  var object = [];
	var taskArray = [
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
		var selectAtdQuery = 'SELECT users.user_id, users.email FROM users INNER JOIN vote ON vote.user_id = users.user_id WHERE vote.bulletin_id = ?';
		connection.query(selectAtdQuery, bulletin_id, (err, row) => {
			if(err){
				console.log(err);
				res.status(500).send({
						stat : "Query Error",
				});
				connection.release();
          		callback(null, "fail");
        }else if(row.length === 0){
        	res.status(202).send({
				stat: "non-vote",
				data : row
			});
			callback("non-article-id error", null);
			connection.release();
        }else{
          res.status(201).send({
            stat : "show vote success",
            data : row
          });
			connection.release();
          callback(null, "successful show vote count");
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
