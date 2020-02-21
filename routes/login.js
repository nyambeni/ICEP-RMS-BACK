const mysql = require('mysql');
const express = require('express');

const mysqlConn= require('../conn/conn');
const bodyParser = require('body-parser');
const router = express.Router();

	

		router.get('/login', function(request, response) {
	
			var email = request.body.email;
			var pwd = request.body.pwd;
			
		var sql = "SELECT * FROM landlord Where email = ? AND pwd = ?";
			
				mysqlConn.query(sql, [email, pwd], function(error, results, fields) {
					if (!error) {
						response.send({data:results});
						Message.send("successfully logged");
						
					}else {
						response.send(error)
					}			   
				   })
							   
					
				})
	
module.exports = router ;
