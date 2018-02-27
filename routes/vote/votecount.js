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
		countQuery: 'UPDATE bulletin SET bulletin_good_count = bulletin_good_count+1 WHERE bulletin_id=? ',
		historyQuery: 'INSERT INTO bulletin_history (bulletin_history.bulletin_id, ink_change_history) ' +
									'VALUES(?, (SELECT bulletin.bulletin_good_count FROM bulletin WHERE bulletin.bulletin_id = ?) DIV 10) ' +
									'ON DUPLICATE KEY UPDATE ink_change_history = IF(ink_change_history < (SELECT bulletin.bulletin_good_count FROM bulletin WHERE bulletin.bulletin_id = ?) DIV 10, ' +
									'VALUES(bulletin_history.ink_change_history), ink_change_history)',
		//inkQuery: '',
    selectQuery: 'SELECT bulletin_id, bulletin_date, bulletin_good_count, bulletin_ink, bulletin_text, topic_text, user_id FROM bulletin WHERE bulletin_id = ?'
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
			connection.query(insertQuery, [user_id, bulletin_id], (err) => {
				if(err){
					console.log(err);
					res.status(501).send({
						stat: "insert error"
					});
					connection.release();
					callback("insert error");
				}else{
					callback(null, connection);
				}
			});
		},
		(connection, callback) => {
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
					callback(null, connection);
				}
			});
	},
	(connection, callback) => {
		let historyQuery = query.historyQuery;
		connection.query(historyQuery, [bulletin_id, bulletin_id, bulletin_id], (err, history) => {
			if(err){
				console.log(err);
				res.status(501).send({
					stat: "history change error"
				});
				connection.release();
				callback("history change error", null);
			}else if(!history){
				callback(null, connection);
			}
			else{
				callback(null, connection);
			}
		});
},
	(connection, callback) => {
		console.log('asdadasdsagsdgdgdgdg');
		var selectQuery = query.selectQuery;
		connection.query(selectQuery, bulletin_id, (err, rows) => {
			if(err){
				console.log(err);
				res.status(500).send({
					stat : "fail"
				});
				connection.release();
				callback("fail");
			} else{
        res.status(201).send({
          stat : "success",
          data : {
						"bulletin_id" : rows[0].bulletin_id,
						"bulletin_date" : rows[0].bulletin_date,
						"bulletin_good_count" : rows[0].bulletin_good_count,
						"bulletin_ink" : rows[0].bulletin_ink,
						"user_id" : rows[0].user_id,
						"bulletin_text" : rows[0].bulletin_text,
						"topic_text" : rows[0].topic_text,
          }
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
