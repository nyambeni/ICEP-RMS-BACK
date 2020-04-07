const con= require('../conn/conn');
const express = require('express');
router = express.Router();
const multer= require('multer');



const storage = multer.diskStorage({

   destination: function(req,file,cb){
    cb(null,"./upload");
      },
      filename: function(req,file,cb){
      cb(null,file.originalname);  
    }

});
const upload = multer({storage:storage});


 router.post('resapply',(req,res)=>{
 var status = "pending";
    let appData = {
    
        studentNum: req.body.studentNum,
        isDisable: req.body.isDisable,
        roomType: req.body.studentNum,
        resName: req.body.resName,
        status:status
    }; 

var sql = "INSERT INTO resapplication SET ?";
con.query(sql,[appData],function(err,results){

    if(err)throw err
    else{
        res.send('Application Sent');
    }
})

})

// to upload proof of registration and reserve room
router.post('/uploadReg',upload.single('reg_proof'),(req,res)=>{
    reg_proof= req.file.path;
    con.query("INSERT INTO reg(reg_proof) VALUES (?)",[reg_proof],function(err,result){
     if(err) throw err;
     
     else
     {
         return res.send({result});
     }
    })
});
 

// change application status to reserved

router.put('/reserve',(req,res)=>{
    let email = (req.body.email)
    con.query('UPDATE resapplication SET status = reserved where email = "'+email+'"',(error,results,fields)=>{
        if(error)throw error
        else
        {
            res.send({results});
        }
    })
});

module.exports=router;