const express = require('express');
router = express.Router();
const  db = require('../conn/conn');
const multer= require('multer');
//


const storage = multer.diskStorage({

   destination: function(req,file,cb){
    cb(null,"./upload");
      },
      filename: function(req,file,cb){
      cb(null,file.originalname);

      }
});


const upload = multer({storage:storage})


router.post('/lord',(req,res)=>{
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
    db.query(myQuery1,[email],function(err,results){
        
        if(results.length > 0){

            res.send({
                data : results,
                code : 200,
                message : "Sorry, user already exist!"

            })

        }else{
                var myQuery = "INSERT INTO landlord SET ?";
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

//Get all student
router.get('/getlord/',(req,res)=>{
    db.query('SELECT * FROM landlord',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
});


//Get a student
router.get('/getlord/:id',(req,res)=>{
    db.query('SELECT * FROM landlord WHERE id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
});

//Delete a student
router.delete('/dellord/:id',(req,res)=>{
    db.query('DELETE FROM landlord WHERE id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    }) 
});


//upload docs
router.post('/upload',upload.single('reg_proof'),(req,res)=>{

    reg_proof= req.file.path;
    

    db.query("INSERT INTO lord(reg_proof) VALUES ('"+ reg_proof+"') ",[reg_proof],function(err,result){
    if(err) throw err;
    
    else
    {
        return res.send({result});
    }
   })

})
module.exports = router;