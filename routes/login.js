
const mysql = require('mysql');
const express = require('express');

const mysqlConn= require('../conn/conn');
const bodyParser = require('body-parser');
const router = express.Router();

	
router.get('/login', function(request, response) {
	
	
	var email = request.body.email;
	var pwd = request.body.pwd;
	

	
		mysqlConn.query('SELECT * FROM landlord WHERE email = ? AND pwd = ?', [email, pwd], function(error, results, fields) {
            if (results.length > 0) {
                response.send(results);
                
			}else {
				response.send('Incorrect Email and/or Password!');
			}			   
			
		});
	

});


module.exports = router ;