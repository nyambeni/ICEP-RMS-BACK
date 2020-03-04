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


module.exports=router;