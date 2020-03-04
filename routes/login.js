const con= require('../conn/conn');
const express = require('express');
router = express.Router();  
const multer= require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './upload');
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
				
				if(error) throw error
				else{
					res.send("successfully logged");
                     
					  }
					
				   })
							   
					
				})


				// router.get('/stulogin', function(req, res) {
	
				// 	var email = req.body.email;
				// 	var pwd = req.body.pwd;
					
				// 	var sql = "SELECT * FROM `student` WHERE email = '"+ email +"' AND pwd = '"+ pwd +"'";
				//     //var sql = "SELECT * FROM student WHERE email = ? AND pwd = ?";
				// 	con.query(sql, [email, pwd], function(error, results, fields) {
						
				// 		if(error) throw error
				// 		else{
				// 			res.send("successfully logged");
				// 			req.session.userID = email;
				// 			console.log(req.session.userID);
				// 			  }
				
				// 		})
				// 	})

				
            //login working with session
				router.get('/userLogin', function(req, res) {
	
					var email = req.body.email;
					var pwd = req.body.pwd;
					
					if (email && pwd) {
						var sql = "SELECT * FROM `student` WHERE email = '"+ email +"' AND pwd = '"+ pwd +"'";
				    
					con.query(sql, [email, pwd], function(error, results, fields) {
					
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


router.post('/upload5',upload.single('reg_proof'),(req,res)=>{
    
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
router.post('/ntwano',upload.single('images'),(req,res)=>{
    
    
	let post={
	  images:req.file.path,
	  email:req.body.email,
	  propery_name:req.body.propery_name,
	  propery_owner:req.body.propery_owner,
	  city:req.body.city,
	  postal_code:req.body.postal_code,
	  street_address:req.body.street_address
            }
 
		var myQuery = "INSERT INTO property SET ?";
                con.query(myQuery, [post], function(err, results){
					if (err) {
						res.send("property not added");  
					}
					else{
						return res.send(results)
						
					}

				})
			})
//
router.get('/getimage',(req,res)=>{
   

		  filepath = path.join(__dirname,'./upload')+'/'+req.body.images;
		  res.sendFile(filepath);
           
});
////
router.get('/getproperty',(req,res)=>{
    con.query('SELECT * FROM property',(err,results)=>{
        if(!err)
            res.send(results);
        else
            console.log(err);
    })
    
});
//
router.post('/addproperty',upload.single('images'),(req,res)=>{
    
    images = req.file.filename;
	let post={
	  email:req.body.email,
	  propery_name:req.body.propery_name,
	  propery_owner:req.body.propery_owner,
	  city:req.body.city,
	  postal_code:req.body.postal_code,
	  street_address:req.body.street_address
			}
			var sql = "INSERT INTO property SET ?";
			con.query(sql, [post], function(err, results){
				if (err) {
					res.send("property not added");  
				}
				else{
					return res.send({results,
					  message: " successful!!! -- property added"})
				}

			})
    if (images) {
	
        con.query("INSERT INTO property(images) VALUES ('"+ images + "')", [images], function(err,results){
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
/////
module.exports = router ;
