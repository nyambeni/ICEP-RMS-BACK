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
   reg_proof= req.file.path;
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
    const file = req.file.path;
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file)
    
  })

//
router.post('/upload3',upload.single('reg_proof'),(req,res)=>{
    
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
module.exports = router;


