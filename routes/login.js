const con= require('../conn/conn');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const bodyParser = require('body-parser');


 router.use(session({
      	secret:'secret',
	   resave: true,
	  saveUninitialized: true
 }));

 router.use(bodyParser.urlencoded({extended : true}));
 router.use(bodyParser.json());


router.get('/studentLogin', function(req, res) {

    let student_no = req.body.student_no;
    let password = req.body.password;

    if(!student_no || !password)
    {
        res.send({message:'enter all the fields'})
    }
   
        con.query('select * from student where student_no = ? AND password =?',[student_no,password],(error,result)=>{
            if(error)throw error;
                
            
            else{
                jwt.sign({student_no},'secretkey',{expiresIn:'30s'},(err,token)=>{
                    res.json({
                        token,
                        data:result
                    });
                });
            }
        }); 

    
 });
  

 router.get('/landlogin', function(req, res) {

    let email = req.body.email_address;
    var password = req.body.password;
    
    if(!email || !password)
    {
        res.send({message:'enter all the fields'})
    }
   
    datb.query('select * from landlord where email_address = ? AND password =?',[email,password],(error,results)=>{  
       if(error)throw error;
                else{
                    jwt.sign({email},'secretkey',{expiresIn:'60s'},(err,token)=>{
                        res.json({
                            token,
                            data:results
                        });
                    });  
                }
    }); 
 });
 

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




module.exports = router ;

