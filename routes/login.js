const con= require('../conn/conn');
const express = require('express');
router = express.Router();  
const multer= require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "./upload");
    },
            filename: function(req,file,cb){
            cb(null,file.originalname);
    }
});

const upload = multer({storage:storage});




		router.get('/lordlogin', function(req, res) {
	
			var email = req.body.email;
			var pwd = req.body.pwd;
			
		var sql = "SELECT * FROM landlord WHERE email = ? AND pwd = ?";
			con.query(sql, [email, pwd], function(error, results, fields) {
				
				if (results.length>0) {
					res.send(results)
					//  req.session.sesEmail = email;
					// 	console.log(req.session.sesEmail);
				}
				else{
					res.send(results)
						console.log(results)
				}
					
				   })
							   
					
				})
				//
				router.post('/studentlogin', function(req, res) {
	
					var email = req.body.email;
					var password = req.body.password;
					
				var sql = "SELECT email, password FROM student WHERE email = ? AND password = ?";
					con.query(sql, [email, password], function(error, results, fields) {
						
						
						if (results.length>0) {
							res.send('logged in')
						
						}
						else{
							res.send("user not found")
							 
						}
							
						})
									   
							
						})

            //login working with session
				router.get('/userLogin', function(req, res) {
	
					var email = req.body.email;
					var password = req.body.password;
					
					if (email && password) {
						var sql = "SELECT * FROM `student` WHERE email = '"+ email +"' AND pwd = '"+ password +"'";
				    
					con.query(sql, [email, password], function(error, results, fields) {
					
						if (results.length>0) {
							res.send("successfully logged")
						 	req.session.sesEmail = email;
								console.log(req.session.sesEmail);
						}
						else{
							res.send("user not found"),
							    console.log(results)
						}
							
						})
						
					} else {
						res.send('Please enter Username and Password!');
						response.end();
					}
					
				})

//logout 
router.post('/logout', function(req,res){
	req.session.destroy(err =>{
		if (err) {
			res.send("logout failed!!!!")

		} else {
			res.clearCookie()
            res.redirect('/userLogin')	
		}

	})



});


router.post('/uploadupload',upload.single('reg_proof'),(req,res)=>{
    
    reg_proof = req.file.path;

    if (reg_proof) {
        con.query("INSERT INTO reg(reg_proof) VALUES ('"+ reg_proof + "')", [reg_proof], function(err,results){
            if (err) {
                res.send("upload document - failed.........file not received");  
            }
            else{
                return res.send({results,
                  message: "document upload - successful!!! --file received"})
            }
            }) 
    } else {
        res.send("PLEASE UPLOAD YOUR DOCUMENT");
    } 
});

//
router.post('/upload5',upload.single('images'),(req,res)=>{
    
    
	let post={
	  email:req.body.email,
	  propery_name:req.body.propery_name,
	  propery_owner:req.body.propery_owner,
	  city:req.body.city,
	  postal_code:req.body.postal_code,
	  street_address:req.body.street_address,
	  reg_proof = req.file.path
            }
    if (images) {
		var myQuery = "INSERT INTO property SET ?";
                con.query(myQuery, [post], function(err, results){
				 	if (err) {
						res.send("property not added");  
					}
					else{
						return res.send({results,
						  message: " successful!!! -- property added"})
					}

				})
        // con.query("INSERT INTO property(images) VALUES ('"+ images + "')", [images], function(err,results){
        //     if (err) {
        //         res.send("upload document - failed.........file not received");  
        //     }
        //     else{
        //         return res.send({results,
        //           message: " successful!!! --file received"})
        //     }
        //     }) 
    } else {
        res.send("PLEASE UPLOAD YOUR DOCUMENT");
    } 
});
//


router.post('/addprofile',upload.single('proof_reg'),(req,res)=>{
    
    reg_proof = req.file.path;
	
    if (reg_proof) {
	
        con.query("INSERT INTO resapplication(proof_reg) VALUES ('"+ proof_reg + "')", [proof_reg], function(err,results){
            if (err) {
                res.send("upload document - failed.........file not received");  
            }
            else{
                return res.send({results,
                  message: " successful!!! --file received"})
            }
            }) 
    } else {
        res.send("PLEASE UPLOAD YOUR DOCUMENT");
    } 
});

//
module.exports = router ;

