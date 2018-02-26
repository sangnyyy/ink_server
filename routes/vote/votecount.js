var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const pool = require('../../config/dbpool');
const async = require('async');
const crypto = require('crypto');

console.log("votecount");

router.post('/', (req,res) => {
	let user_id = req.session.user_id;
	let bulletin_id = req.body.bulletin_id;
	let query = {
		insertQuery: 'INSERT INTO vote (user_id, type, bulletin_id) VALUES (?, 1, ?)',
		countQuery: 'UPDATE bulletin SET bulletin_good_count = bulletin_good_count+1 WHERE bulletin_id=?',
    selectQuery: 'SELECT user_id, type, bulletin_id FROM vote WHERE bulletin_id = ?'
	};
	console.log("fjfjfj");
	let taskArray = [
		(callback) =>{
	    console.log(req.session.user_id);
	    if(req.session.user_id){
	      callback(null);
	    }else{
	      callback("0");
	      res.status(500).send({
	        stat : 0
	      });
	    }
	  },
		(callback) => {
			pool.getConnection((err, connection) => {
				if(err){
					res.status(501).send({
						stat: "fail"
					});
					connection.release();
					callback("DB connection err : ");
				}else{
					callback(null, connection);
				}
			});
		},
		(connection, callback) => {
			let insertQuery = query.insertQuery;
			console.log(insertQuery);
			connection.query(insertQuery, [user_id, bulletin_id], (err, insertData) => {
				if(err){
					console.log(err);
					res.status(501).send({
						stat: "insert error"
					});
					connection.release();
					callback("insert error");
				}else{
					callback(null, connection, insertData);
				}
			});
		},
		(connection, insertData, callback) => {
			let countQuery = query.countQuery;
			console.log(countQuery);
			connection.query(countQuery, bulletin_id, (err) => {
				if(err){
					console.log(err);
					res.status(501).send({
						stat: "vote error"
					});
					connection.release();
					callback("vote error", null);
				}else{
          connection.release();
    			res.status(501).send({
    				stat: "vote update fail"
    			});
					callback(null, connection, insertData);
				}
			});
	},
	(connection, insertData, callback) => {
		console.log('asdadasdsagsdgdgdgdg');
		var selectQuery = query.selectQuery;
		connection.query(selectQuery, bulletin_id, (err, rows) => {
			if(err){
				res.status(500).send({
					stat : "fail"
				});
				connection.release();
				callback("fail");
			} else{
        console.log(insertData);
        res.status(201).send({
          stat : "success",
          data : {
            "user_id" : insertData.user_id,
            "type" : insertData.type,
            "bulletin_id" : insertData.bulletin_id
          },
          list : rows
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
