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




router.post('/addlord',(req,res)=>{
    let lordData = {
    
        "lname": req.body.lname,
        "id_no": req.body.id_no,
        "email": req.body.email,
        "cell": req.body.cell,
         "campus_loc": req.body.campus_loc,
         "title": req.body.title,
         "pwd": req.body.pwd,
         "fname": req.body.fname
       
    }; 
    //var email = req.body.email;
    var email = req.body.email;
    var myQuery1 = "SELECT * FROM landlord WHERE email = ?";
    con.query(myQuery1,[email],function(err,results){
        
        if(results.length > 0){

            res.send({
                data : results,
                code : 200,
                message : "Sorry, user already exist!"

            })

        }else{
                var myQuery = "INSERT INTO landlord SET ?";
                con.query(myQuery, [lordData], function(err, results){
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



//Get a student
router.get('/getlord/:id',(req,res)=>{
    con.query('SELECT * FROM landlord WHERE id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
});

//Delete a student
router.delete('/dellord/:id',(req,res)=>{
    con.query('DELETE FROM landlord WHERE id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    }) 
});


//upload docs
router.post('/upload',upload.single('reg_proof'),(req,res)=>{
   //reg_proof= req.file.path;
   con.query("INSERT INTO reg(reg_proof) VALUES (?)",[reg_proof],function(err,result){
    if(err) throw err;
    
    else
    {
        return res.send({result});
    }
   })

})
//

router.post('/uploadfile', upload.single('reg_proof'), (req, res, next) => {
    //const file = req.file.path;
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file)
    
  })

//
router.post('/upload3',upload.single('reg_proof'),(req,res)=>{
    
    //reg_proof = req.file.path;

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



 //apply for residence


 router.post('/resapplication',(req,res)=>{
     var status = "PENDING";
    let applyData = {
        email : req.body.email,
        prop_email	:req.body.prop_email,
        status:status
     };
        var prop_email = req.body.prop_email;
        var email = req.body.email;
    var myQuery1 = "SELECT * FROM resapplication WHERE prop_email=?";

    con.query(myQuery1,[prop_email],function(err,results){
        
        if(results.length>0){

            res.send({
                message : "You have already applied on this property"

            })

        }else{
                var myQuery = "INSERT INTO resapplication SET ?";
                con.query(myQuery, [applyData], function(err, results){
                    if(err) throw err
                    
                    else{
                        res.send({
                            message : "Application sent..."
            
                        })
                     
                    }
            })
        }
        
    })
});
 //
 //decline application
 router.put('/decline',(req,res)=>{
    var email = req.body.email;
    var sql ="UPDATE resapplication SET status ='DECLINED' WHERE email=?"
    con.query(sql,[email],function(err,results){
        if(!err)
            res.send('Application Declined');
        else
            console.log(err);
    })
 })

 //accept application

 router.put('/accept',(req,res)=>{
    var email = req.body.email;
    var prop_email = req.body.prop_email;
    var sql ="UPDATE resapplication SET status ='ACCEPTED' WHERE email=?"
    con.query(sql,[email],function(err,results){
        if(err){
            res.send('something went wrong');
        }else{
            var sql1= "UPDATE property set avail_rooms=avail_rooms-1 WHERE prop_email=?";
            con.query(sql1,[prop_email],function(err,results){
              if(err)throw err;
              else{
                  res.send('Room activated');
              }

            })
                
        }
    })
 })

//add property
router.post('/addproperty',(req,res)=>{
    let propData = {
      prop_email : req.body.prop_email,
      property_name:req.body.property_name,
      property_owner:req.body.property_owner,
      campus_loc:req.body.campus_loc,
      city:req.body.city,
      postal_code:req.body.postal_code,
      street_address:req.body.street_address,
      num_rooms:req.body.num_rooms,
      avail_rooms:req.body.num_rooms   
    }; 
    //var email = req.body.email;
    var prop_email = req.body.prop_email;
    var myQuery1 = "SELECT * FROM property WHERE prop_email = ?";
    con.query(myQuery1,[prop_email],function(err,results){
        
        if(results.length > 0){

            res.send({
            
                message : "Sorry, this property is already registered[tip: check email address]"

            })

        }else{
                var myQuery = "INSERT INTO property SET ?";
                con.query(myQuery, [propData], function(err, results){
                    if(err)throw err
                    else{
                        res.send({

                            message : "Application sent"
            
                        })
                    }
            })
        }
        
    })
});

///view applications by gender

router.get('/getgender',(req,res)=>{

    let gender = req.body.gender;
    con.query ="SELECT * FROM students where gender = ?",[gender],function(error,results,fields)
    {
        if(error)throw error
    else{
        res.send({results});
    }        

    }
})

// view all properties available

router.get('/viewProperty',(req,res)=>{
    con.query('SELECT * from property',function(error,results,fields){
        if(error)throw error
        else{
            res.send({results});
        }
    })
})
module.exports = router;


