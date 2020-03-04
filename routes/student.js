const db= require('../conn/conn');
const express = require('express');
router = express.Router();


//register student 

router.post('/reg', function(req, res){  

    var post = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "password": req.body.password
    };


    var email = req.body.email;
    var myQuery1 = "SELECT * FROM student WHERE email = ?";
    db.query(myQuery1,[email],function(err,results){
        
        if(results.length > 0){

            res.send({
                data : results,
                code : 200,
                message : "Sorry, user already exist!"

            })

        }else{
                var myQuery = "INSERT INTO student SET ?";
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

//Get all student
router.get('/getstudent/',(req,res)=>{
    db.query('SELECT * FROM student',(err,rows,fields)=>{
      if(err)throw err
      else{
          res.send(rows);
          console.log(req.session.userID);

      }
    })
    
});


//Get a student
router.get('/getstud/:id',(req,res)=>{
    db.query('SELECT * FROM student WHERE id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
});

//Delete a student
router.delete('/delstud/:id',(req,res)=>{
    db.query('DELETE FROM student WHERE id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    }) 
});
//*************************************************** */

router.post('/addstudent', function(req, res){  

    var studentData = {
        "studentNum":req.body.studentNum,
        "fname":req.body.fname,
        "lname":req.body.lname,
        "id_num":req.body.id_num,
        "email":req.body.email,
        "cell":req.body.cell,
        "campus_loc":req.body.campus_loc,
        "pwd":req.body.pwd
    };

    

    var email = req.body.email;
    var myQuery1 = "SELECT * FROM student WHERE email = ?";
    db.query(myQuery1,[email],function(err,results){
        
        if(results.length > 0){

            res.send({
                data : results,
                message : "Sorry, user already exist!"

            })

        }else{
                var myQuery = "INSERT INTO student SET ?";
                db.query(myQuery, [studentData], function(err, results){
                    if(err){
                        
                        res.send({
                            data : err,
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


//************************************************ */

////////////////////////////////////////////5555555555555555555555////////////////////////

router.post('/addstud',(req,res)=>{
    let lordData = {
        "studentNum":req.body.studentNum,
        "fname":req.body.fname,
        "lname":req.body.lname,
        "id_num":req.body.id_num,
        "email":req.body.email,
        "cell":req.body.cell,
        "campus_loc":req.body.campus_loc,
        "pwd":req.body.pwd
       
    }; 
    //var email = req.body.email;
    var email = req.body.email;
    var myQuery1 = "SELECT * FROM student WHERE email = ?";
    db.query(myQuery1,[email],function(err,results){
        
        if(results.length > 0){

            res.send({
                data : results,
                code : 200,
                message : "Sorry, user already exist!"

            })

        }else{
                var myQuery = "INSERT INTO student SET ?";
                db.query(myQuery, [lordData], function(err, results){
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
//44444444444444444444444444444

module.exports = router ;
