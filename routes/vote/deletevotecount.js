var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const pool = require('../../config/dbpool');
const async = require('async');
const crypto = require('crypto');

console.log("deletevote");

router.post('/', (req,res) => {
	let bulletin_id = req.body.bulletin_id;
	let user_id = req.session.user_id;
	let query = {
		checkQuery: 'SELECT bulletin_id, type, user_id FROM vote WHERE (bulletin_id, type, user_id) = (?, 1, ?)',
		deleteQuery: 'DELETE FROM vote WHERE (bulletin_id, user_id, type) = (?, ?, 1)',
		voteCountQuery: 'UPDATE bulletin SET bulletin_good_count = bulletin_good_count-1 WHERE bulletin_id=?',
    selectQuery: 'SELECT bulletin_id, bulletin_date, bulletin_good_count, bulletin_ink, bulletin_text, topic_text, user_id FROM bulletin WHERE bulletin_id = ?'
	};

	let taskArray = [
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
		console.log("hi");
		let checkQuery = query.checkQuery;
		console.log(checkQuery);
		connection.query(checkQuery, [bulletin_id, user_id], (err, userData) => {
			console.log("in");
			if(err){
				console.log(err);
				res.status(501).send({
					stat:"fail"
				});
				callback("chec err ");
				connection.release();
			}else if(userData.length===0){
				res.status(501).send({
					stat: "null error "
				});
				callback("null error");
				connection.release();
			}else{
				console.log("hi");
				callback(null, connection);
			}
		});
	},
	(connection, callback) => {
		let voteCountQuery = query.voteCountQuery;
		connection.query(voteCountQuery, bulletin_id, (err) => {
			if(err){
				res.status(501).send({
					stat: "null error "
				});
				connection.release();
				callback("comment count minus error");
			}else{
				callback(null, connection);
			}
		});
	},
	(connection, callback) => {
		let deleteQuery = query.deleteQuery;
		connection.query(deleteQuery, [bulletin_id, user_id], (err) => {
			if(err){
				res.status(401).send({
					stat: "delete error"
				});
				connection.release();
				callback("delete error");
			}else{
        let selectQuery = query.selectQuery;
        connection.query(selectQuery, bulletin_id, (err,rows) =>{
          if(err){
            res.status(401).send({
              stat:"select error"
            });
            connection.release();
            callback("select error");
          }else{
            res.status(201).send({
    					stat: "delete vote success",
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
    				callback("delete success", null);
          }
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
