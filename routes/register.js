const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const  db = require('../conn/conn');


//register student 

router.post('/reg', function(req, res){  

    var post = {
        "lname": req.body.First_name,
        "fname": req.body.Last_name,
        "email": req.body.email,
        "password": req.body.passwrd
    };


    var email = req.body.email;
    var myQuery1 = "SELECT * FROM admin WHERE email = ?";
    db.query(myQuery1,[email],function(err,results){
        
        if(results.length > 0){

            res.send({
                data : results,
                code : 200,
                message : "Sorry, user already exist!"

            })

        }else{
                var myQuery = "INSERT INTO admin SET ?";
                db.query(myQuery, [post], function(err, results){
                    if(err){
                        
                        res.send({
                            data : err,
                            code : 400,
                            message : "The was an error !!!"
                        });
                            
                    }else{
                        
                        console.log("results")
                        res.send({
                            data : results,
                            code : 200,
                            message : "Registered Successfully..."
            
                        })
                    }
            })
        }
        
    })
});

module.exports = router ;
